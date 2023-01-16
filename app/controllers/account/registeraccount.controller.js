const users = require('../../models/users.model.js');

//const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const  JWT  = require('jsonwebtoken');
const { check } = require('express-validator');

exports.create = async (req, res) => {
   console.log(req.body);
   const { name , family ,country ,email,password, confirm_password } = req.body;
  

};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {


};

// Find a single note with a noteId
exports.findOne = (req, res) => {

};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

};

