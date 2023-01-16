const Setting = require('../models/setting.model.js');

exports.create = (req, res) => {

};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    const  setting = new Setting({
        title: "Untitled Note",
    });
    setting.save();
    return res.status(200).send({
        message: "Note content can not be empty"
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

