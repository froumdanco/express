

const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { assign } = require('nodemailer/lib/shared');
const Article = require('../../models/blog.model');
const Gallery = require('../../models/gallery.model');
const bloggroup = require('../../models/bloggroup.model');
const setting = require('../../models/setting.model');


exports.create = async (req, res) => {


};

// Retrieve and return all notes from the database.
exports.findAll = async (req, res) => {

   const settingdata = await setting.find().select(['-telegrapapi', '-chanaltelegram']);;
    return res.status(200).send({
        settingdata: settingdata,

    });
};

// Find a single note with a noteId
exports.findOne = async (req, res) => {
    const settingdata = await setting.findOne({lang:req.params.Id}).select(['-telegrapapi', '-chanaltelegram']);;
    return res.status(200).send({
        settingdata: settingdata,

    });
//url:req.params.Id
};

// Update a note identified by the noteId in the request
exports.update = async (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res) => {

};

