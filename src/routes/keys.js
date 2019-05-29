const express=require("express");
const router=express.Router();

router.post("/findHashes",async (req,res)=>
{
    /* COLOCAR BS */
    console.log("Solicitud");
    var MDBDAOKey_1 = require("../app/classes/dataAccess/dao/MDBDAOKey");
    var daoKey = new MDBDAOKey_1.MDBDAOKey();
    var fileInfo=req.body;
    var idFile=fileInfo.id;
    var d1=await daoKey.findKeysByFileId(idFile);
    console.log(d1);
    fileInfo.hashKey=d1[0].keyHash;
    fileInfo.hashMac=d1[1].keyHash;

    res.send(fileInfo);
});


module.exports=router;