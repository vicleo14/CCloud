const express=require("express");
const router=express.Router();

router.get("/register",(req,res)=>
{
    res.render("auth/register");
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
    res.render("auth/login");
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
module.exports=router;