const users = require('../../models/users.model.js');

//const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const  JWT  = require('jsonwebtoken');
const { check } = require('express-validator');
const user = require('../../models/users.model');
var express    = require('express');
var bodyParser = require('body-parser');

exports.create = async (req, res) => {
    const update = await  user.findOne({_id:req.user._id});
    const { image } = req.body;
    console.log(image);

};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    console.log(req.user);

    return res.status(200).send({
        message:{
            name:req.user.name,
            phone:req.user.phone,
            email:req.user.email,
            lastname:req.user.lastname,
            avatar:req.user.avatar,
            solgen:req.user.solgen,
            confrimemail:req.user.confrimemail
        }
    });


};

// Find a single note with a noteId
exports.findOne =async (req, res) => {
};

exports.profileimage = async (req,res)=>{
    console.log(req.body);
    const { image } = req.body;
    
    const update = await  user.findOne({_id:req.user._id});
        update.avatar = image;
        update.save();
        return res.status(200).send({
            message: 'Update Succes'
        });

};
// Update a note identified by the noteId in the request
exports.update =async (req, res) => {
    const { name, lastname,solgen } = req.body;

    const update = await  user.findOne({_id:req.user._id});
    update.name=name;
    update.lastname=lastname;
    update.solgen=solgen;
      update.save(function (err, applicant) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                return res.status(422).send({
                    message: 'url is Available'
                });
            } else {
                err = bg.validateSync();
                return res.status(422).send({
                    message: err
                });
            };
        }else {
            return res.status(200).send({
                message: 'Update Succes'
            });
        }
      });


};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

};

