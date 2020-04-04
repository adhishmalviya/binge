const mongoose=require('mongoose');
const express = require('express');
const Joi=require('joi');
const router = express.Router();
const Genre=mongoose.model('Genre',new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:4,
        maxlength:20
    }

}));



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


router.post('/',async (req,res)=>{

    let { error }= validateGenre(req.body);// OBJECT DESTRUCTURING

if(error)
{
    let error_message="";
    for(field in error.details)
    error_message+=error.details[field].message;
    return res.status(400).send(error_message);
}
    let new_genre= Genre({ name: req.body.genre});
    new_genre=await new_genre.save();
    res.send(new_genre);

});


router.put('/:id',async (req,res)=>
{   let { error }= validateGenre(req.body);// OBJECT DESTRUCTURING

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

router.delete('/:id',async (req,res)=>
{
    let genre=await Genre.findByIdAndRemove(req.params.id)
    if(!genre)
    return res.status(404).send("No genre with this id exists");
    res.send(genre);
});

function validateGenre(request_body)
{
        const genre_schema = {
        name:Joi.string().min(3).required()
    };
    
    return Joi.validate(request_body,genre_schema);
};



module.exports = router;
