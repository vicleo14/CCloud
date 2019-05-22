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
    console.log(req.body);
    const {nickname,password}=req.body;
    const BUser1=require("../app/classes/bussines/BUser");
    var buser=new BUser1.BUser();
    try
    {
        var result=await buser.userLogin(nickname,password);
        if(result==true)
        {
            console.log("Existe");
            res.redirect(200,"/user/my-files");
        }
        else
        {
            info={"error_message":"Problems with the authentication","error_detailed":"Sorry, we could not authenticated you correctly. Try again."}
            console.log("Error con usuario");
            res.redirect(200,"/error");
        }
            
    }
    catch(x)
    {
        info={"error_message":"Problems with the authentication","error_detailed":"Sorry, we could not authenticated you correctly. Try again."}

        res.redirect("/error",{info:info});
        //console.log("Error:",x);
    }
});
module.exports=router;