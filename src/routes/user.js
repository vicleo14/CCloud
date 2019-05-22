const express=require("express");
const router=express.Router();
router.get("/register",(req,res)=>
{
    res.render("user/register");
});
router.post("/register",async (req,res)=>
{
    res.send("recibido");
    console.log(req.body)
    const {curp,name,lastname,secondlast,nickname,email,password,rpass,birthdate}=req.body;
    const BUser1=require("../app/classes/bussines/BUser");
    var buser=new BUser1.BUser();
    try
    {
        buser.createUser(curp,name,lastname,secondlast,birthdate,2,nickname,password,email);
    }
    catch(x)
    {
        console.log("Error:",x);
    }
     
    
});
router.get("/login",(req,res)=>
{
    res.render("user/login");
});
router.post("/login",async (req,res)=>
{
    res.send("recibido Login");
    console.log(req.body);
    const {nickname,password}=req.body;
    const BUser1=require("../app/classes/bussines/BUser");
    var buser=new BUser1.BUser();
    try
    {
        var res=await buser.userLogin(nickname,password);
        if(res==true)
            console.log("Existe");
        else
            console.log("Error con usuario");
    }
    catch(x)
    {
        console.log("Error:",x);
    }
});
router.get("/upload-file",(req,res)=>
{
    res.render("user/uploadfile");
});
router.post("/upload-file",(req,res)=>
{
    res.send("recibido file");
    console.log(req.body);
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
module.exports=router;