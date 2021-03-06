const mongoose=require('mongoose');
const express = require('express');
const router = express.Router();
const {Genre,validate}=require('../models/genre');
const admin =require('../middlewares/admin');
const auth=require('../middlewares/auth');



router.get('/',async(req,res)=>{
const genres = await Genre.find().sort('name');
res.send(genres);
});

router.get('/:id',async (req,res)=>{

    let genre=await Genre.findById(req.params.id);
    if(!genre)
    return res.status(404).send("No genre with this id exists");
    res.send(genre);
});


router.post('/',auth,async (req,res)=>{

    let { error }= validate(req.body);// OBJECT DESTRUCTURING

if(error)
{
    let error_message="";
    for(field in error.details)
    error_message+=error.details[field].message;
    return res.status(400).send(error_message);
}
    let new_genre= Genre({ name: req.body.name});
    new_genre=await new_genre.save();
    res.send(new_genre);

});


router.put('/:id',auth,async (req,res)=>
{   let { error }= validate(req.body);// OBJECT DESTRUCTURING

        if(error)
        {
            let error_message="";
            for(field in error.details)
            error_message+=error.details[field].message;
            res.status(400).send(error_message);
            return;
        }
    let genre=await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true}); 
    if(!genre)
    return res.status(404).send("No genre with this id exists");
        res.send(genre);

});

router.delete('/:id',[admin,auth],async (req,res)=>
{
    let genre=await Genre.findByIdAndRemove(req.params.id)
    if(!genre)
    return res.status(404).send("No genre with this id exists");
    res.send(genre);
});



module.exports = router;
