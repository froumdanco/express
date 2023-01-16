const users = require('../models/users.model.js');
//const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const JWT = require('jsonwebtoken');
const { render } = require('../../app.js');
var jade = require('jade');
var path = require('path');
var nodemailer = require('nodemailer');


exports.create = async (req, res) => {


};

// Retrieve and return all notes from the database.
exports.findAll = async (req, res) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',

    auth: {
      user: 'dancocoin@gmail.com',
      pass: 'qgewicyubyhpovhf'
    }

  });

 //res.render('email');
  res.render('email', {variables: 'aasdad'}, function(err, final_html) {
    if (err) throw err; // TODO: handle errors better
  
    var mailOptions = {
      from: 'dancocoin@gmail.com',
      to: 'afrangart@gmail.com',
      subject: 'Sending Email using Node.js',
      html: final_html
  
    };
     transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
  
        return res.status(200).send({
          message: error
        });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).send({
          message: info.response
        });
      }
  
    });
    // call node-mailer with `mailOptions` here ...
  });



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

