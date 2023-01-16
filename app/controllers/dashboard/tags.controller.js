

const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { assign } = require('nodemailer/lib/shared');
const Tag = require('../../models/tags.model');
const Article = require('../../models/blog.model');


exports.create = async (req, res) => {
    
  
  

};

// Retrieve and return all notes from the database.
exports.findAll =async (req, res) => {


     
        const options = {
            page: req.query.page,
            limit: req.query.limit,
            
          };
       
            const list = await  Tag.paginate({},options);
            return res.status(200).send({
                message: list
      
            });
 
   
  

};

// Find a single note with a noteId
exports.findOne =async (req, res) => {

 
};

// Update a note identified by the noteId in the request
exports.update = async (req, res) => {


};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res) => {
    const update = await  Tag.findOne({_id:req.params.Id});
    if(update==null){
        return res.status(404).send({
            message: 'Not Found'
        });
    }
  //  findList=await Article.find({'tags':{$in:[update.name]}});
    
        await Article.updateMany( {'tags':{$in:[update.name]}}, { $pullAll: {tags: [update.name] } } )
        await update.delete();
    // update.delete();
     return res.status(200).send({
         message: 'deleted'
     });
};

