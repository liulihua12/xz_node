const express=require('express');//引入第三方模块

const pool=require('../pool.js');//引入连接池
const router=express.Router();//创建路由器

//1.用户注册
router.post('/login',(req,res)=>{
	//获取数据
    //console.log(req.body);
	//验证数据是否为空
	if(!req.body.uname){
		res.send({code:401,msg:'uname required'});
		return;
	}
	if(!req.body.upwd){
		res.send({code:402,msg:'upwd required'});
		return;
	}
	if(!req.body.email){
		res.send({code:403,msg:'email required'});
		return;
	}
	if(!req.body.phone){
		res.send({code:404,msg:'phone required'});
		return;
	}
	//把数据插入到数据库
	//执行SQL语句
	pool.query('INSERT INTO xz_user SET ?',[req.body],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send({code:200,msg:'register suc'});
		};
	});
});

//2.用户登录
router.post('/register',(req,res)=>{
	//验证数据是否为空
	if(!req.body.uname){
		res.send({code:401,msg:'uname required'});
		return;
	}
	if(!req.body.upwd){
		res.send({code:402,msg:'upwd required'});
		return;
	}
	//执行SQL语句
	//查询数据中是否含有用户名和密码相匹配的数据
	pool.query(`SELECT * FROM xz_user WHERE
		uname=? AND
		upwd=?`,[req.body.uname,req.body.upwd],(err,result)=>{
		if(err) throw err;
		//如果数组中有元素说明成功，没有元素说明失败
		//console.log(result);
		if(result.length>0){
			res.send({code:200,msg:'reg suc'});
		}else{
			res.send({code:301,msg:'reg err'});
		};
	});
});

//3.用户删除
router.get('/delete',(req,res)=>{
	//判断是否为空
	if(!req.query.uid){
		res.send({code:301,msg:'uid required'});
		return;
	}
	//执行SQL语句
	//删除用户
	pool.query(`DELETE FROM xz_user WHERE uid=?`,[req.query.uid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send({code:200,msg:'delete suc'});
		}else{
			res.send({code:301,msg:'delete err'});
		};
	});
});

//4.检索用户
router.get('/detail',(req,res)=>{
	//判断是否为空
	if(!req.query.uid){
		res.send({code:301,msg:'uid required'});
		return;
	};
	//SQL语句 检索用户
	pool.query(`SELECT * FROM xz_user WHERE uid=?`,[req.query.uid],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send(result);
		}else{
			res.send({code:301,msg:'detail error'});
		};
	});
});

//5.用户修改
router.post('/update',(req,res)=>{
	var obj=req.body;
	//验证数据是否为空
	//遍历对象中的属性,如果属性值是否为空，提示属性名这一项必须的。
	var num=400;
	for(var key in obj){
		num++;
		if(!obj[key]){
			res.send({code:num,msg:key+'required'});
			return;
		};
	};
	//SQL语句 修改用户
	pool.query(`UPDATE xz_user SET email=?,phone=?,user_name=?,gender=? WHERE 
		uid=?`,[obj.email,obj.phone,obj.user_name,obj.gender,obj.uid],(err,result)=>{
			if(err) throw err;
			if(result.affrctedRows>0){
				res.send({code:200,msg:'update success'});
			}else{
				res.send({code:301,msg:'update error'});
			};
	});
});

//6.用户列表
router.get('/list',(req,res)=>{
	var pno=req.query.pno;//页码
	var count=req.query.count;//数量
	//如果页码数量为空,默认值为1;
	if(!pno) pno=1;
	//如果数量数量为空,默认值为2;
	if(!count) count=2;
	//转整型
	pno=parseInt(pno);
	count=parseInt(count);
	//根据页码和数量计算开始查询的值
	//算法(页码-1)*数量
	var start=(pno-1)*count;
	//执行SQL语句分页查询  LIMIT
	pool.query(`SELECT * FROM xz_user LIMIT ?,?`,[start,count],(err,result)=>{
		if(err) throw err;
		res.send(result);
	});
});









module.exports=router;//输出路由器