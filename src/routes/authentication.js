const express=require("express");
const router=express.Router();
const passport=require("passport");

router.get("/register",(req,res)=>
{
    res.render("auth/register");
});
router.post("/register",async (req,res)=>
{
    res.render("other/welcome");
    //console.log(req.body)
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
router.post("/login",(req,res,next)=>{
    passport.authenticate("local.login",{
        successRedirect:"../user/my-files",
        failureRedirect:"/login",
        failureFlash:true
    })(req,res,next)
});
router.get("/logout",(req,res)=>
{
    req.logOut();
    //req.session.destroy;
    res.redirect("/login");
});
/*
router.post("/login",async (req,res)=>
{
    console.log(req.body);
    
    passport.authenticate("local.login",
    {
        successRedirect:"../user/myfiles",
        failureRedirect:"/login",
        failureFlash:true
    });

    
    
});*/
module.exports=router;