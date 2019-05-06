//引入express模块
const express=require('express');
const bodyParser=require('body-parser');//body-parser模块

const userRouter=require('./routes/user.js');//引入用户路由器文件
const productRouter=require('./routes/product.js');//引入商品路由器文件
const demo_userRouter=require('./routes/demo_user.js');//引入demo_user文件
const demo_productRouter=require("./routes/demo_product.js");//引入demo_product文件
const myproRouter=require("./routes/mypro.js");//引入mypro文件



//创建服务器
var server=express();
server.listen(8080);
//托管静态资源到public目录下
server.use(express.static('public'));
//托管静态资源到ajaxdemo目录下
server.use(express.static('ajaxdemo'));
//托管静态资源到mypro目录下
server.use(express.static("mypro"));







//使用body-parser中间件***必须在路由器前面使用
server.use(bodyParser.urlencoded({
	extended:false
}));



//挂载路由器，挂载到/user
server.use('/user',userRouter);
//商品路由器挂载到/product
server.use('/product',productRouter);
//挂载路由器demo_user
server.use('/demo_user',demo_userRouter);
//挂载服务器到demo_product
server.use('/demo_product',demo_productRouter);
//挂载路由mypro
server.use("/mypro",myproRouter);
