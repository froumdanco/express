

const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { assign } = require('nodemailer/lib/shared');
const Setting = require('../../models/setting.model');



exports.create = async (req, res) => {
    const { name,url,parent} = req.body;

  

};

// Retrieve and return all notes from the database.
exports.findAll =async (req, res) => {

   

};

// Find a single note with a noteId
exports.findOne =async (req, res) => {
    const Settingdb = await  Setting.findOne({lang:req.params.Id});
    return res.status(200).send({
        message:Settingdb
    });
};

// Update a note identified by the noteId in the request
exports.update = async (req, res) => {
    const { title , lang ,keywords , description, telegrapapi,chanaltelegram ,SocailNetwork, ContactUs } = req.body;
    const Settingdb = await  Setting.findOne({lang:lang});
    Settingdb.title=title;
    Settingdb.keywords=keywords;
    Settingdb.description=description;
    Settingdb.telegrapapi=telegrapapi;
    Settingdb.chanaltelegram=chanaltelegram;
    Settingdb.SocailNetwork=SocailNetwork;
    Settingdb.ContactUs=ContactUs;
   await Settingdb.save(function (err, applicant) {
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
            message: 'Update Success'
        });
    }

    });
  

   
};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res) => {
   
};

