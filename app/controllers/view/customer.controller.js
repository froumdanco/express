

const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { assign } = require('nodemailer/lib/shared');
const customer = require('../../models/customer.model');


exports.create = async (req, res) => {
   
  

};

// Retrieve and return all notes from the database.
exports.findAll =async (req, res) => {
   
   const customers= await  customer.find({}).populate(['mainimage']);
    return res.status(200).send({
        customer: customers,

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

