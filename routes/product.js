//使用中间件
const express=require('express');
//创建路由器
const router=express.Router();
//引入连接池
const pool=require('../pool.js');

//1.商品列表
router.get('/list',(req,res)=>{
	var obj=req.query;
	var pno=obj.pno;
	var count=obj.count;
	if(!pno) pno=1;
	if(!count) count=5;
	pno=parseInt(pno);
	count=parseInt(count);
	start=(pno-1)*count;
	//执行SQL语句 分页查询 LIMIT
	pool.query(`SELECT * FROM xz_laptop LIMIT ?,?`,[start,count],(err,result)=>{
		if(err) throw err;
		res.send(result);
	});
});

//2.添加商品
router.get('/addtion',(req,res)=>{
	var obj=req.query;//获取数据对象
	var num=300;
	for(var key in obj){
		num++;
		if(!obj[key]){    //验证非空
			res.send({code:num,msg:key+'required'});
			return;
		};
	};
	//执行SQL语句 添加商品
	pool.query(`INSERT INTO xz_laptop SET ?`,[obj],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send({code:200,msg:'addtion success'});
		};
	});
});
//3.删除商品
router.get('/delete',(req,res)=>{
	if(!req.query){
		res.send({code:301,msg:'lid required'});
		return;
	}
	pool.query(`DELETE FROM xz_laptop WHERE lid=?`,[req.query.lid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send({code:200,msg:'delete success'});
		}
	});
});
//4.修改商品
router.get('/update',(req,res)=>{
	let obj=req.query;
	let num=300;
	for(var key in obj){
		num++;
		if(!obj[key]){
			res.send({code:num,msg:key+'required'});
			return;
		}
	}
	pool.query(`UPDATE xz_laptop SET title=?,lname=?,price=?,spec=?,shelf_time=? WHERE lid=?`,
		[obj.title,obj.lname,obj.price,obj.price,obj.spec,obj.lid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send({code:200,msg:'update success'});
		}
	});
});

//5.检索商品
router.get('/select',(req,res)=>{
	var id=req.query.lid;
	var name=req.query.lname;
	if(!id && !name){
		res.send({code:301,msg:'lname required'});
		return;
	}else if(!!id && !!name){
		pool.query(`SELECT * FROM xz_laptop WHERE lid=? AND LIKE lname="%?%"`,[id,name],(err,result)=>{
			if(err) throw err;
			if(result.length>0){
				res.send(result);
			}
		});
	}
	if(!!id){
		pool.query(`SELECT * FROM xz_laptop WHERE lid=?`,[id],(err,result)=>{
			if(err) throw err;
			if(result.length>0){
				res.send(result);
			}
		});
	}else if(!!name){
		pool.query(`SELECT * FROM xz_laptop WHERE lname LIKE ?`,"%"+[name]+"%",(err,result)=>{
			if(err) throw err;
			if(result.length>0){
				res.send(result);
			}
		});
	}
});








//导出路由器
module.exports=router;