//使用中间件
const express=require('express');
//创建路由器
const router=express.Router();
//引入连接池
const pool=require('../pool.js');

//用户登录
router.post('/login',(req,res)=>{
	console.log("已连接")
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	if(!$uname){
		res.send("用户名不能为空");
		return;
	}
	if(!$upwd){
		res.send("用户密码不能为空");
		return;
	}
	var sql="SELECT * FROM xz_user WHERE uname=? AND upwd=?";
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(result.length>0){
			res.send("登录成功");
		}else{
			res.send("登录失败");
		}
	})
});

//用户列表
router.get('/list',(req,res)=>{
	console.log('已连接');
	var $pno=req.query.pno;
	var $count=req.query.count;
	if(!$pno)$pno=1;
	if(!$count)$count=5;
	var $pno=parseInt($pno);
	var $count=parseInt($count);
	var start=($pno-1)*$count;
	var sql="SELECT * FROM xz_user LIMIT ?,?";
	pool.query(sql,[start,$count],(err,result)=>{
		console.log(result);
			if(err) throw err;
			res.send(result);
	})
});

//删除用户
router.get("/delete",(req,res)=>{
	var $uid=req.query.uid;
	if(!$uid){
		res.send("用户不存在");
		return;
	}
	var sql="delete from xz_user where uid=?"
	pool.query(sql,[$uid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send('删除成功');
		}else{
			res.send("删除失败");
		};
	})
});

//查询用户
router.get("/select",(req,res)=>{
	console.log("已连接")
	var $uid=req.query.uid;
	pool.query(`SELECT uname,upwd,phone,user_name,email,gender FROM xz_user WHERE uid=?`,[$uid],(err,result)=>{
		if(err)throw err;
		if(result.length>0){
			res.send(result);
		}else{
			res.send('err1');
		};
	});
})

//修改用户
router.post("/update",(req,res)=>{
	var obj=req.body;
	console.log(obj);
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	var $phone=req.body.phone;
	var $user_name=req.body.user_name;
	var $email=req.body.email;
	var $gender=req.body.gender;
	var $uid=req.body.uid;
	for(var key in obj){
		if(!obj[key]){
			res.send(`alert(key+"不能为空")`);
			return;
		}
	}

	var sql="UPDATE xz_user SET uname=?,upwd=?,phone=?,user_name=?,email=?,gender=? WHERE uid=?";
	pool.query(sql,[$uname,$upwd,$phone,$user_name,$email,$gender,$uid],(err,result)=>{
		if(err)throw err;
		console.log(result);
		if(result.affectedRows>0){
			res.send(`alert("修改成功");location.href="http://127.0.0.1:8080/ajax_user_list.html"`);
		}else{
			res.send(`alert("修改失败")`);
		};
	})

});












//导出路由器
module.exports=router;