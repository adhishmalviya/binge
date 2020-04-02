const express= require('express');
const Joi=require('joi');
const genres= require('./routes/genres');
const home=require('./routes/home');
const config=require('config');
var app=express();
app.use(express.json());
app.use('/genres',genres);
app.use('/',home);
app.set('view engine','pug');
//app.set ('views','./views');//default & optional to set path of views 


console.log("Application Name:",config.get('name'));
console.log("Mail Server",config.get('mail.host'));//export NODE_ENV=development
console.log("Password",config.get('password'));//export app_password=1234




var port=process.env.PORT||3000;


app.listen(port,()=>{
console.log(`Listening at PORT ${port}`);
});

