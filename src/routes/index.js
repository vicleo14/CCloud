const express=require("express");
const router=express.Router();

router.get("/",(req,res)=>
{
    res.send("Inicio de desarrollo");
});

module.exports=router;