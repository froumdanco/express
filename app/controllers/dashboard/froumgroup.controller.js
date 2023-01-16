

const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { assign } = require('nodemailer/lib/shared');
const db = require('../../models/fgroup');
const { DeleteitemComponent } = require('./global');
'use strict';

var fs = require('fs')
const QRCode = require('qrcode');

const sharp = require('sharp');


exports.create = async (req, res) => {
    const { name, description } = req.body;
    var url = '';

    const bg = new db({
        name: name,
        description: description,
    });
   

    await bg.save(async function (err, applicant) {
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
        } else {
            // url = await QRCode.toDataURL(`https://wallpaperdemo.ir/detail/ablum/${bg.id}`);
            // bg.barcode = url;
            // await bg.save();
            return res.status(200).send({
                message: 'add Success',
                data: bg
            });
        }
    });



};

// Retrieve and return all notes from the database.
exports.findAll = async (req, res) => {

    let find = null;
    if (req.query.group) {
        find = req.query.group;
    }
    const options = {
        page: req.query.page,
        limit: req.query.limit,
        populate: [
            { 
                path:'toGroup'
            },
            
        ]

    };
    if (find == null) {
        const list = await db.paginate({}, options);
        return res.status(200).send({
            message: list

        });
    } else {
        const list = await db.paginate({ parent: find }, options);
        return res.status(200).send({
            message: list

        });
    }


};

// Find a single note with a noteId
exports.findOne = async (req, res) => {

    const list = await db.findOne({ _id: req.params.Id }).populate('toGroup');;

    if (list == null) {
        return res.status(404).send({
            message: 'Not Found'
        });
    }
    return res.status(200).send({
        message: list,
    });

};

// Update a note identified by the noteId in the request
exports.update = async (req, res) => {


    const update = await db.findOne({ _id: req.params.Id });
    if (update == null) {
        return res.status(404).send({
            message: 'Not Found'
        });
    }
    const { name, description } = req.body;
    console.log(req.name);
    update.name = name;
    update.description = description;
    update.save(function (err, applicant) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                return res.status(422).send({
                    message: 'url is Available'
                });
            } else {
                err = update.validateSync();
                return res.status(422).send({
                    message: err
                });
            };
        } else {
         

            return res.status(200).send({
                message: 'Update Succes'
            });
        }
    });


};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res) => {
    const update = db.findOne({ _id: req.params.Id });
    await DeleteitemComponent(req.params.Id);
    await db.deleteOne({ _id: req.params.Id });

    return res.status(200).send({
        message: 'Deleted Success'
    });

};

