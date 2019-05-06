//引入express模块
const express=require("express");
//创建路由器
const router=express.Router();
//引入连接池文件
const pool=require("../pool.js");

router.get("/list",(req,res)=>{
	console.log('已链接');
	var obj=req.query;
	var pno=obj.pno;
	var count=obj.count;
	if(!pno)pno=1;
	if(!count)count=5;
	pno=parseInt(pno);
	count=parseInt(count);
	start=(pno-1)*count;
	pool.query(`SELECT * FROM xz_laptop LIMIT ?,?`,[start,count],(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
}); 













//输出路由器
module.exports=router;