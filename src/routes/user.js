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
    var size=0;
    var i=0;
    console.log("cipheredM:",cipheredM);
    console.log("CipheredData: ",cipheredData);
    //await bsFile.saveFile(nickname,name,cipheredData,size,cipheredM,mac,cipheredK,hashK,hashM);
    var subido;
    await (subido = bsFile.uploadFile(nickname, name, cipheredData, size, cipheredM, mac, cipheredK, hashM, hashK));
    console.log(subido);
    
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
});

router.get("/my-requests",async(req,res)=>
{
    var BRequest_1 = require("../app/classes/bussines/BRequest");
    bRequest = new BRequest_1.BRequest();
    
    var imprimir = bRequest.findRequestsByUser("memo1");
    /*var MDBDAORequest_1 = require("../app/classes/dataAccess/dao/MDBDAORequest");
    daoRequest = new MDBDAORequest_1.MDBDAORequest();
    var MDBDAOFileInfo_1 = require("../app/classes/dataAccess/dao/MDBDAOFileInfo");
    daoFiles = new MDBDAOFileInfo_1.MDBDAOFileInfo();
    var DTORequest_1 = require("../app/classes/dataAccess/dto/DTORequest");
    resultado = new DTORequest_1.DTORequest();
    var DTOFileInfo_1 = require("../app/classes/dataAccess/dto/DTOFileInfo");
    file = new DTOFileInfo_1.DTOFileInfo();

    var resultado = await daoRequest.findRequestByUser("memo1");
    var imprimir = [];
    console.log(resultado);
    console.log(resultado.length);
    for(var i=0; i<resultado.length; i+=1){
        var file = await daoFiles.findFileById(resultado[i].getIdFile());
        var keyType;
        resultado[i].getIdKeyType()?keyType="File":keyType="MAC";
        var fileName = file[i].getDecipheredName();
        var state = resultado[i].getState();
        var state_desc;
        if(state == 1)
            state_desc="Sent";
        else if(state == 2)
            state_desc="Confirmed";
        else
            state_desc="Finished";
        var auxiliar = [fileName,keyType];
        console.log(auxiliar);
        resultado[i].setIdFile(fileName);
        resultado[i].setUser(keyType);
        var dat = resultado[i].getCodeDate();
        imprimir[i] = {
            file:fileName,
            keyType:keyType,
            date:dat,
            state:state_desc
        }  
    }*/
    console.log(imprimir);
    res.render("user/myrequests",{requests:imprimir});
});

router.post("/public-key",async (req,res)=>
{    
    var key=fs.readFileSync("./publicKey.txt");
    console.log(key.toString());
    res.send(key);
});

module.exports=router;