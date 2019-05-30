const express=require("express");
const router=express.Router();

router.get("/ongoing-requests",(req,res)=>
{
    res.render("admin/requestsMade");
});

module.exports=router;