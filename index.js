const express= require('express');
const Joi=require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const genres= require('./routes/genres');
const home=require('./routes/home');
const login=require('./routes/login');
const movies =require('./routes/movies');
const customers=require('./routes/customers');
const users=require('./routes/users');
const rentals=require('./routes/rentals');
const config=require('config');
const startupDebugger= require('debug')('binge:startup');//export DEBUG=binge:startup
const dbDebugger=require('debug')('binge:db');//export DEBUG=binge:db
const morgan = require('morgan');
const custom_logger=require('./middlewares/logger');
const mongoose = require('mongoose') ;

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
  }
mongoose.connect('mongodb://localhost/binge')
        .then(()=>console.log('MongoDB Connected'))
        .catch((err)=>console.log("Error: Couldn't connect to MongoDB",err.message));

var app=express();
app.use(express.json());
app.use(express.static('public'));
app.use(custom_logger);

if(app.get('env')==='development')//default value is development 
{
    app.use(morgan('tiny'));// tiny is argument given for minimal log.
    //this is a middleware that's why this should be put above route handlers
    startupDebugger("Morgan Enabled.");
}

app.use('/genres',genres);
app.use('/customers',customers);
app.use('/movies',movies);
app.use('/rentals',rentals);
app.use('/login',login);
app.use('/users',users);
app.use('/',home);//refactoring different routes 
app.set('view engine','pug');// pug is a template engine used to send HTML responses
//app.set ('views','./views');//default & optional to set path of views 



console.log("Application Name:",config.get('name'));
console.log("Mail Server",config.get('mail.host'));//export NODE_ENV=development
//console.log("Password",config.get('password'));//export app_password=1234


//Put some database work hare
dbDebugger("database debugger check");

var port=process.env.PORT||3005;


app.listen(port,()=>{
console.log(`Listening at PORT ${port}`);
});

