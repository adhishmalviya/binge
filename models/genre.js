const mongoose=require('mongoose');
const Joi=require('joi');
const genreSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:4,
        maxlength:20
    }

});
const Genre=mongoose.model('Genre',genreSchema);

function validateGenre(request_body)
{
    
        const genre_schema = {
        name:Joi.string().min(3).required()
    };
    
    return Joi.validate(request_body,genre_schema);
};

exports.Genre=Genre;
exports.validate=validateGenre;
exports.genreSchema=genreSchema;