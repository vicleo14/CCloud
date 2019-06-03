const express=require("express");
const fs=require("fs");
const router=express.Router();
router.get("/upload-file",(req,res)=>
{
    res.render("user/uploadfile");
});
router.post("/upload-file",async (req,res)=>
{
    var BSFile_1 = require("../app/classes/bussines/BFile");
    const bsFile = new BSFile_1.BFile();
    //res.send("recibido file");
    var fileInfo=req.body;
    var cipheredK=fileInfo.AESkey;
    var cipheredM=fileInfo.macKey;
    var hashK=fileInfo.hashK;
    var hashM=fileInfo.hashM;
    var cipheredData=fileInfo.data;
    var name=fileInfo.name;
    var mac=fileInfo.mac;
    //var nickname=fileInfo.nickname;
    var size=fileInfo.size;
    var nickname=req.session.user.username;
    var i=0;
    console.log("cipheredM:",cipheredM);
    console.log("CipheredData: ",cipheredData);
    var subido = await bsFile.uploadFile(nickname, name, cipheredData, size, cipheredM, mac, cipheredK, hashM, hashK);
    console.log(subido);
    
    res.send(true);
});
router.get("/download-file",async (req,res)=>
{
    //console.log("Params:",req.query.id);
    var id=req.query.id;
    var MDBDAOFileInfo_1 = require("../app/classes/dataAccess/dao/MDBDAOFileInfo");
    var daoFiles = new MDBDAOFileInfo_1.MDBDAOFileInfo();
    var results=await daoFiles.findFileById(id);
    //console.log(results);
    res.render("user/downloadfile",{files:results});
});

router.post("/download-file",async (req,res)=>
{
    var obj=req.body;
    var idFile=obj.id;
    console.log("Solicitud de Descarga:",idFile);
    var FSDAOFileData_1 = require("../app/classes/dataAccess/dao/FSDAOFileData");
    var fs = new FSDAOFileData_1.FSDAOFileData();
    const path="storage/";
    var MDBDAOFileInfo_1 = require("../app/classes/dataAccess/dao/MDBDAOFileInfo");
    var daoFile=new MDBDAOFileInfo_1.MDBDAOFileInfo();
    var DTOFileInfo_1 = require("../app/classes/dataAccess/dto/DTOFileInfo");
    var infoFile=await daoFile.findFileById(idFile);
    
    var nameFileC=infoFile[0].getCipheredName();
    var cipheredMessage=fs.readFile(path,nameFileC).toString();
    //console.log(cipheredMessage.length);
    obj.dataFile=cipheredMessage;
    res.send(obj);
});

router.get("/my-files",async (req,res)=>
{
    var MDBDAOFileInfo_1 = require("../app/classes/dataAccess/dao/MDBDAOFileInfo");
    daoFiles = new MDBDAOFileInfo_1.MDBDAOFileInfo();
    console.log("Username:",req.session.user.username);
    var results=await daoFiles.findFilesByUser(req.session.user.username);
    res.render("user/myfiles",{files:results});
});

router.get("/key-lost",async (req,res)=>
{    
    var idFile=req.query.id;
    console.log("IDFILE:",idFile);
    var BKey_1 = require("../app/classes/bussines/BKey");
    var bKey = new BKey_1.BKey();
    await bKey.keyLost(req.session.user.username,idFile);
    res.render("user/keylost");
    
});

router.get("/request-key",async (req,res)=>
{    
    res.render("user/requestkey");
    var BRequest_1 = require("../app/classes/bussines/BRequest");
    bRequest = new BRequest_1.BRequest();
    //console.log("AaaaaaaaaaAAAAAAA:",req.session.user.username);
    var requestValid = await bRequest.newRequest(req.session.user.username,req.query.id, 1);
    if(!requestValid){
        
    }
});

router.get("/my-requests",async(req,res)=>
{
    var BRequest_1 = require("../app/classes/bussines/BRequest");
    bRequest = new BRequest_1.BRequest();
    /* AQUI */
    //console.log("values:",express);
    var imprimir = await bRequest.findRequestsByUser(req.session.user.username);
    console.log("VALUES:",imprimir);
    res.render("user/myrequests",{requests:imprimir});
});

router.get("/confirm-request",async(req,res)=>
{
    var BRequest_1 = require("../app/classes/bussines/BRequest");
    bRequest = new BRequest_1.BRequest();
    var pass=new Array();
    pass.push(await bRequest.findRequestByIdUserAndType("memo1",req.query.id,req.query.type));
    //console.log(pass);
    res.render("user/confirmrequest",{requests:pass});
});

router.post("/confirm-request",async(req,res)=>
{
    /*var BRequest_1 = require("../app/classes/bussines/BRequest");
    bRequest = new BRequest_1.BRequest();
    //console.log(req.body);
    var requestInfo=req.body;
    var idFile=req.body.idFile;
    var user=req.body.user;
    var keyType=req.body.keyType;
    var code=req.body.code; 
    var response = await bRequest.confirmRequest(user, idFile, keyType, code);
    
    console.log(idFile);
    res.send(requestInfo);*/
    console.log(req.body);
});

router.post("/public-key",async (req,res)=>
{    
    var key=fs.readFileSync("./publicKey.txt");
    //console.log(key.toString());
    res.send(key);
});
router.get("/my-profile",async (req,res)=>
{      
    var DAOUser_1 = require("../app/classes/dataAccess/dao/MDBDAOUser");
    daoUser=new DAOUser_1.MDBDAOUser();
    var infoDAO=await daoUser.findUsers(req.session.user.username);
    
    var info={
        curp:infoDAO.getCurp(),
        name:infoDAO.getName(),
        lastnameA:infoDAO.getLastNameA(),
        lastnameB:infoDAO.getLastNameB(),
        birthday: infoDAO.getBirthday(),
        email: "prueba@email.com"
    }
    console.log(info);
    res.render("user/myprofile",{infoUser:info});
});
router.post("/updateInfo",async (req,res)=>
{      
    var DAOUser_1 = require("../app/classes/dataAccess/dao/MDBDAOUser");
    var DTOUser_1 = require("../app/classes/dataAccess/dto/DTOUser");
    daoUser=new DAOUser_1.MDBDAOUser();
    dtoUser=new DTOUser_1.DTOUser();
    //console.log(req.body);
    var password=req.body.password;
    const BUser1=require("../app/classes/bussines/BUser");
    const DTOUser1=require("../app/classes/dataAccess/dto/DTOUser");
    var buser=new BUser1.BUser();
    try
    { 
        var result=await buser.userLogin(req.session.user.username,password);
        if(result!=null)
        {
            var infoDAO=await daoUser.findUsers(req.session.user.username);
            console.log(infoDAO);
            infoDAO.setName(req.body.name);
            infoDAO.getLastNameA(req.body.lastnameA);
            infoDAO.getLastNameB(req.body.lastnameB);
            infoDAO.setBirthday(req.body.birthday);
            infoDAO.setNickname(req.session.user.username);
            await daoUser.updateUser(infoDAO);
            req.flash("success","Everything correct");
        }
        else
        {
            req.flash("message","Authentication failed");
        }
    }
    catch(x)
    {
        req.flash("message","Something is wrong. Try again later.");
    }
    res.redirect("/user/my-profile");
});
router.post("/change-password",async (req,res)=>
{      
    var DAOUser_1 = require("../app/classes/dataAccess/dao/MDBDAOUser");
    var DTOUser_1 = require("../app/classes/dataAccess/dto/DTOUser");
    daoUser=new DAOUser_1.MDBDAOUser();
    dtoUser=new DTOUser_1.DTOUser();
    //console.log(req.body);
    var password=req.body.pact;
    var password2=req.body.rp;
    var password3=req.body.pa;
    console.log(req.body);
    const BUser1=require("../app/classes/bussines/BUser");
    const DTOUser1=require("../app/classes/dataAccess/dto/DTOUser");
    var buser=new BUser1.BUser();
    try
    { 
        var result=await buser.userLogin(req.session.user.username,password);
        if(result!=null)
        {
            if(password2==password3)
            {
                var infoDAO=await daoUser.updatePassword(req.session.user.username, password2);
                req.flash("success","Password correctly changed");
            }
            else
            {
                req.flash("message","Passwords does not match");
            }
        }
        else
        {
            req.flash("message","Authentication failed");
        }
    }
    catch(x)
    {
        req.flash("message","Something is wrong. Try again later.");
    }
    res.redirect("/user/my-profile");
});


module.exports=router;