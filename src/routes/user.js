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
    var size=0;
    var i=0;
    //console.log("cipheredM:",cipheredM);
    //console.log("CipheredData: ",cipheredData);
    //await bsFile.saveFile(nickname,name,cipheredData,size,cipheredM,mac,cipheredK,hashK,hashM);
    var subido;
    await (subido = bsFile.uploadFile(nickname, name, cipheredData, size, cipheredM, mac, cipheredK, hashM, hashK));
    //console.log(subido);
    
    /*await bsFile.saveFile(nickname,name,cipheredData,size,cipheredM,mac,cipheredK,hashK,hashM);
    console.log("finished");*/
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

router.post("/public-key",async (req,res)=>
{    
    var key=fs.readFileSync("./publicKey.txt");
    //console.log(key.toString());
    res.send(key);
});
router.get("/my-profile",async (req,res)=>
{      
    res.render("user/myprofile");
});

module.exports=router;