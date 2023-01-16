const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const fav = require('../../models/fav.models');


exports.create = async (req, res) => {
   
  

};

exports.createcode = async (req, res) => {
    return  res.status(200).send({
        message: req.fingerprint['hash']
    });
  
};

// Retrieve and return all notes from the database.
exports.findAll = async (req, res) => {

  
};
exports.searched = async (req, res) => {
   
//url:req.params.Id
};
// Find a single note with a noteId
exports.findOne = async (req, res) => {
    return  res.status(200).send({
        message: 'remove from fav'
    });
//url:req.params.Id
};

// Update a note identified by the noteId in the request
exports.update = async (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res) => {

    
    return  res.status(200).send({
        message: 'remove from fav'
    });
};

