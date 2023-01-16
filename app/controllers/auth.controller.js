const users = require('../models/users.model.js');

//const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const  JWT  = require('jsonwebtoken');

exports.create = async (req, res) => {
   
    let user = await  users.findOne({email:req.body.email}).exec();
    if(req.body.email==null || req.body.password==null){
        return res.status(422).send({
            message: 'Type Username and password'
        });
    }
    if(user==null){
        return res.status(422).send({
            message: 'User Not Found'
        });
    }
    let check=await bcrypt.compareSync(req.body.password, user.password);

    if(check==false){
        return res.status(422).send({
            message: 'Password is wrong! Try Again'

        });
    }
    if(check==true){
      // console.log(process.env.JWD_SECRET)
      
    JWTTken= JWT.sign({id:user._id, email: user.email },process.env.JWD_SECRET);
    return res.status(200).send({
        token: JWTTken,
        message:'wellcome'

    });

    }

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

