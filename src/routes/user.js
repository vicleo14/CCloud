const express=require("express");
const router=express.Router();

router.get("/upload-file",(req,res)=>
{
    res.render("user/uploadfile");
});
router.post("/upload-file",(req,res)=>
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
    var nickname="vicleo16";
    var size=0;
    
    bsFile.saveFile(nickname,name,cipheredData,size,cipheredM,mac,cipheredK,hashK,hashM);
    /*
    "name":file[0].name,
              "mac":mres,
              "hashK":hashK,
              "hashM":hashm,
              "AESkey":cipheredKeyC,
              "macKey":cipheredKeyM,
              "data":cipheredData
    console.log(fileInfo.name);*/
});

router.get("/my-files",async (req,res)=>
{
    var MDBDAOFileInfo_1 = require("../app/classes/dataAccess/dao/MDBDAOFileInfo");
    daoFiles = new MDBDAOFileInfo_1.MDBDAOFileInfo();
    var results=await daoFiles.findFilesByUser("vicleo16");
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
module.exports=router;