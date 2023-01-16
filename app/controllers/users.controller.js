const users = require('../models/users.model.js');
//const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const  JWT  = require('jsonwebtoken');


exports.create = async (req, res) => {

    const usersdb = new users({
        email: req.body.email,
        password: req.body.password,
    });
    let okey=true;
 await  usersdb.save(function (err, applicant) {
      if (err) {
          if (err.name === 'MongoError' && err.code === 11000) {
              return res.status(422).send({
                  message: 'email is Available'
              });
          } else {
              err = usersdb.validateSync();
              return res.status(422).send({
                  message: err
              });
          };
      }else {
              let hash = bcrypt.hashSync(req.body.password, 10);
              usersdb.password = hash;
              usersdb.save();
              JWTTken= JWT.sign({id:usersdb._id, email: usersdb.email },process.env.JWD_SECRET);
              return res.status(200).send({
                  token: JWTTken,
                  message:'wellcome'
      
              });
      }
    });

};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    return res.status(200).send({
        message: 'df'
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

