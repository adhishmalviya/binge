const express= require('express');
const Joi=require('joi');
var app=express();

app.use(express.json());

genres=[{
    id:1, genre:'Thriller'},{
        id:2, genre:'Comedy'},{
            id:3, genre:'Fantasy'}];


app.get('/genres',(req,res)=>{
res.send(genres);

});


app.get('/genres/:id',(req,res)=>{

    let genre=genres.find(f=>{return f.id==req.params.id});// f=>f.id===req.params.id 
    if(!genre)
    {
        res.status(404).send("No genre with this id exists");
        return;

    }
    res.send(genre);

});


app.post('/genres/',(req,res)=>{

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


app.put('/genres/:id',(req,res)=>
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


app.delete('/genres/:id',(req,res)=>
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
var port=process.env.PORT||3000;


app.listen(port,()=>{
console.log(`Listening at PORT ${port}`);
});

