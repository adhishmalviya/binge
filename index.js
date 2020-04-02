const express= require('express');
const Joi=require('joi');
const genres= require('./routes/genres');
const home=require('./routes/home');

var app=express();
app.use(express.json());
app.use('/genres',genres);
app.use('/',home);
app.set('view engine','pug');
//app.set ('views','./views');//default & optional to set path of views 





var port=process.env.PORT||3000;


app.listen(port,()=>{
console.log(`Listening at PORT ${port}`);
});

