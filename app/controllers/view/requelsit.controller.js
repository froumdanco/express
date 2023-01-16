

const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { assign } = require('nodemailer/lib/shared');
const re = require('../../models/requestlist.model');


exports.create = async (req, res) => {
    const { phone , name,email,description } = req.body;
    const requestlist = new re({
        name: name,
        phone: phone,
        email:email,
        description:description,
    });
    
    await  requestlist.save(function (err, applicant) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                return res.status(422).send({
                    message: 'url is Available'
                });
            } else {
                err = requestlist.validateSync();
                return res.status(422).send({
                    message: err
                });
            };
        }else {
            return res.status(200).send({
                message: 'add Success',
                data:requestlist
            });
        }
      });

};

// Retrieve and return all notes from the database.
exports.findAll =async (req, res) => {
   
  
   
  

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

