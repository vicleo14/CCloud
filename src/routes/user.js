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
    var nickname="memo1";
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
    console.log(cipheredMessage.length);
    obj.dataFile=cipheredMessage;
    res.send(obj);
});

router.get("/my-files",async (req,res)=>
{
    var MDBDAOFileInfo_1 = require("../app/classes/dataAccess/dao/MDBDAOFileInfo");
    daoFiles = new MDBDAOFileInfo_1.MDBDAOFileInfo();
    var results=await daoFiles.findFilesByUser("memo1");
    console.log(results);

    res.render("user/myfiles",{files:results});
});

router.get("/key-lost",async (req,res)=>
{    
    res.render("user/keylost");
    
});

router.get("/request-key",async (req,res)=>
{    
    res.render("user/requestkey");
    var BRequest_1 = require("../app/classes/bussines/BRequest");
    bRequest = new BRequest_1.BRequest();
    var requestValid = bRequest.newRequest('memo1',req.query.id, 1);
    if(!requestValid){
        
    }
});

router.get("/my-requests",async(req,res)=>
{
    var BRequest_1 = require("../app/classes/bussines/BRequest");
    bRequest = new BRequest_1.BRequest();
    var imprimir = await bRequest.findRequestsByUser("memo1");
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
    console.log(key.toString());
    res.send(key);
});

module.exports=router;