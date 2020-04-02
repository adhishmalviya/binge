const express= require('express');

const app=express();


function log(req,res,next)
{

    console.log("Logging...");

    next();

}

module.exports=log;
