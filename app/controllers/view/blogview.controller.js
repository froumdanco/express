

const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { assign } = require('nodemailer/lib/shared');
const Blog = require('../../models/bloggroup.model.js');
const Article = require('../../models/blog.model.js');


exports.create = async (req, res) => {
   
  

};

// Retrieve and return all notes from the database.
exports.findAll =async (req, res) => {
   
  
   
  

};

// Find a single note with a noteId
exports.findOne =async (req, res) => {
 
    const group = await  Blog.findOne({url:req.params.Id});;
    const options = {
        page: req.query.page,
        limit:12,
        populate:['mainimage','groups']
        
      };
   
    const list = await  Article.paginate({parent:group._id},options);;

    if(group==null){
     return res.status(404).send({
         message: 'Not Found'
     });
 }
    return res.status(200).send({
     group:group ,
     list:list ,
 });
 
};

// Update a note identified by the noteId in the request
exports.update = async (req, res) => {
 
};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res) => {
  
};

