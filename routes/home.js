const express = require('express');
const router = express.Router();



router.get('/',(req,res)=>
{
res.render('index',{
    title:"Binge! Home", message:"Hello, Welcome to"

});

});


module.exports=router;
