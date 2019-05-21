const express=require("express");
const router=express.Router();
router.get("/register",(req,res)=>
{
    res.render("user/register");
});
router.post("/register",(req,res)=>
{
    res.send("recibido");
    
    const {curp,name,lastbame,lastnameb,nickname,email,pass,rpass,birth}=req.body;
    console.log(curp);
});
module.exports=router;