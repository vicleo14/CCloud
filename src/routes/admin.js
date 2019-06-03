const express=require("express");
const router=express.Router();

router.get("/ongoing-requests",async (req,res)=>
{
	var BRequest_1 = require("../app/classes/bussines/BRequest");
    bRequest = new BRequest_1.BRequest();
    var imprimir = await bRequest.findRequestByState(1);
    res.render("admin/requestsMade",{requests:imprimir});
});

router.get("/get-key",async (req,res)=>
{
	var BRequest_1 = require("../app/classes/bussines/BRequest");
    bRequest = new BRequest_1.BRequest();
    var pass=new Array();
    pass.push(await bRequest.findRequestByIdUserAndType("memo1", req.query.id, req.query.type));
    res.render("admin/getKey",{request:pass});
});

module.exports=router;