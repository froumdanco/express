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

      const options = {
        page: req.query.page,
        limit: 4,
        populate:'mainimage groups',
        select:'-text'
        
      };
      
    const blog = await  Article.paginate({
        tags:{ $in:[req.params.Id] }
    },options);
        
    
        if(blog==null){
            return res.status(404).send({
                message: 'Not Found'
            });
        }
           return res.status(200).send({
               message:blog ,
               tag:req.params.Id ,
        });
   
  
  
   

 
};

// Update a note identified by the noteId in the request
exports.update = async (req, res) => {
 
};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res) => {
  
};

