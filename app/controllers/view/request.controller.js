

const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { assign } = require('nodemailer/lib/shared');
const itemsave = require('../../models/request.model');


exports.create = async (req, res) => {
    const { name  } = req.body;
    const bg = new itemsave({
        name: name,
        data: req.body.data,
    });
    await  bg.save(function (err, applicant) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                    console.log(err);
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
                message: 'add Sucess',
                data:bg
            });
        }
      });
  


};

// Retrieve and return all notes from the database.
exports.findAll = async (req, res) => {



};

// Find a single note with a noteId
exports.findOne = async (req, res) => {
 


};

// Update a note identified by the noteId in the request
exports.update = async (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res) => {

};

