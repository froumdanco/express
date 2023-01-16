

const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { assign } = require('nodemailer/lib/shared');
const Blog = require('../../models/blog.model');
const tolang = require('../../models/languagedata.model');


exports.create = async (req, res) => {
  

};

// Retrieve and return all notes from the database.
exports.findAll =async (req, res) => {

  

};

// Find a single note with a noteId
exports.findOne =async (req, res) => {

    const list = await  Blog.findOne({_id:req.params.Id});;
  
 
};
 tagmanager =async (tags) => {

}
// Update a note identified by the noteId in the request
exports.update = async (req, res) => {


};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res) => {

};

