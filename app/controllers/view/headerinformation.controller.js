

const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { assign } = require('nodemailer/lib/shared');
const Article = require('../../models/blog.model');
const setting = require('../../models/setting.model');

exports.create = async (req, res) => {
   
  

};

// Retrieve and return all notes from the database.
exports.findAll =async (req, res) => {
    const settingdata = await  setting.findOne().select(['-telegrapapi','-chanaltelegram']);;
    if(settingdata==null){
     return res.status(404).send({
         message: 'not found'
     });
 }
    return res.status(200).send({
        setting:settingdata ,
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
  
};

