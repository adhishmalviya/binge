const express = require('express');
const router = express.Router();


genres=[{
    id:1, genre:'Thriller'},{
        id:2, genre:'Comedy'},{
            id:3, genre:'Fantasy'}];


router.get('/',(req,res)=>{
res.send(genres);

});

router.get('/:id',(req,res)=>{

    let genre=genres.find(f=>{return f.id==req.params.id});// f=>f.id===req.params.id 
    if(!genre)
    {
        res.status(404).send("No genre with this id exists");
        return;

    }
    res.send(genre);

});


router.post('/',(req,res)=>{

    let { error }= validateGenre(req.body);// OBJECT DESTRUCTURING

if(error)
{
    let error_message="";
    for(field in error.details)
    {
        error_message+=error.details[field].message;

    }
    res.status(400).send(error_message);
    return;
}
    const new_genre= {
        id: genres.length+1,
        genre : req.body.genre
    };
    genres.push(new_genre);
    res.send(new_genre);

});


router.put('/:id',(req,res)=>
{
    let genre=genres.find(f=>{return f.id==req.params.id});// f=>f.id===req.params.id 
    if(!genre)
    {
        res.status(404).send("No genre with this id exists");
        return;

    }

    let { error }= validateGenre(req.body);// OBJECT DESTRUCTURING

if(error)
{
    let error_message="";
    for(field in error.details)
    {
        error_message+=error.details[field].message;

    }
    res.status(400).send(error_message);
    return;
}
 
genre.genre=req.body.genre;
res.send(genre);

});

function validateGenre(request_body)
{

    const genre_schema = {
        genre:Joi.string().min(3).required()
    };
    
    return Joi.validate(request_body,genre_schema);
};


router.delete('/:id',(req,res)=>
{
    let genre=genres.find(f=>{return f.id==req.params.id});// f=>f.id===req.params.id 
    if(!genre)
    {
        res.status(404).send("No genre with this id exists");
        return;

    }
const index = genres.indexOf(genre);
genres.splice(index,1);
res.send(genre);

});


module.exports = router;
