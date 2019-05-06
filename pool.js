const mysql=require('mysql');//引入数据库
var pool=mysql.createPool({  //创建连接池
	host:'127.0.0.1',
	port:'3306',
	user:'root',
	password:'',
	database:'xz',
	connectionLimit:15
});




//导出连接池
module.exports=pool;





















