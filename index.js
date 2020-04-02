const express= require('express');
const Joi=require('joi');
const genres= require('./routes/genres');
const home=require('./routes/home');
const config=require('config');
const startupDebugger= require('debug')('binge:startup');//export DEBUG=binge:startup
const dbDebugger=require('debug')('binge:db');//export DEBUG=binge:db
const morgan = require('morgan');

var app=express();
app.use(express.json());
app.use('/genres',genres);
app.use('/',home);
app.set('view engine','pug');// pug is a template engine used to send HTML responses
//app.set ('views','./views');//default & optional to set path of views 



console.log("Application Name:",config.get('name'));
console.log("Mail Server",config.get('mail.host'));//export NODE_ENV=development
console.log("Password",config.get('password'));//export app_password=1234

if(app.get('env')==='development')
{
    app.use(morgan('tiny'));
    
    startupDebugger("Morgan Enabled.");
}
//Put some database work hare
dbDebugger("database debugger check");

var port=process.env.PORT||3000;


app.listen(port,()=>{
console.log(`Listening at PORT ${port}`);
});

