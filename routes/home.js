const express = require('express');
const router = express.Router();



router.get('/',(req,res)=>
{
res.render('index',{
    title:"Binge! Home", message:"Hello This is Binge!"

});

});


module.exports=router;
