

const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { assign } = require('nodemailer/lib/shared');
const Article = require('../../models/blog.model');


exports.create = async (req, res) => {
   
  

};

// Retrieve and return all notes from the database.
exports.findAll =async (req, res) => {
   
  
   
  

};

// Find a single note with a noteId
exports.findOne =async (req, res) => {
      const blog= await  Article.findOne({url:req.params.Id}).populate([{path:'mainimage'},{path:'groups'},{path:'tovideo'},{path:'tocomponent',populate:{path:'wallpaper'}}]);
      if(blog==null){
        return res.status(404).send({
            message: 'Not Found'
        });
    }
    const options = {
        page: 1,
        limit: 1,
        populate:'mainimage groups',
        select:'-text',
        sort:'-updatedAt',
       
        
        
      };

    const list = await  Article.paginate({
        _id:{ $ne:[blog._id] },  parent:blog.parent
    },options);
    const lastnews = await  Article.find({ _id:{ $ne:[blog._id] } , parent:blog.parent}).populate(['mainimage','groups']).limit(4).sort('-updatedAt');
  
           return res.status(200).send({
               message:blog ,
               list:list ,
               lastnews:lastnews ,
        });
 
};

// Update a note identified by the noteId in the request
exports.update = async (req, res) => {
 
};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res) => {
  
};

