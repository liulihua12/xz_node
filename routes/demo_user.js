//使用中间件
const express=require('express');
//创建路由器
const router=express.Router();
//引入连接池
const pool=require('../pool.js');

//创建路由器对象
//router.get('/ajaxdemo',(req,res)=>{
//	console.log('你连上我了');
//	res.send('我的第一个ajax');
//});

//登录接口 login get 方法(应该使用post)
router.get('/login',(req,res)=>{
    console.log('你连上我了');
	var $uname=req.query.uname;
	var $upwd=req.query.upwd;
	if(!$uname){
		res.send('用户名不能为空');
		return;
	}
	if(!$upwd){
		res.send('用户密码不能为空')
		return;
	}
	//使用连接池查询数据库
	var sql="select * from xz_user where uname=? AND upwd=?";
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(result.length>0){
			res.send("登录成功");
		}else{
			res.send("登录失败");
		}
	});
	
});


router.post('/post_login',(req,res)=>{
    console.log('你连上了');
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	if(!$uname){
		res.send('用户名不能为空');
		return;
	}
	if(!$upwd){
		res.send('用户密码不能为空')
		return;
	}
	//使用连接池查询数据库
	var sql="select * from xz_user where uname=? AND upwd=?";
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(result.length>0){
			res.send("登录成功");
		}else{
			res.send("登录失败");
		}
	});
	
});



//导出路由器
module.exports=router;