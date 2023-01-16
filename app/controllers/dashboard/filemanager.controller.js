

const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const filemanager = require('../../models/filemanager.model');
'use strict';

var fs = require('fs')
const QRCode = require('qrcode');

const sharp = require('sharp');



exports.create = async (req, res) => {
    var OldPath = './' + req.file.path;
    var NewPath = './public/media/' + req.body.component + '/' + req.body.parent + '/' + req.file.filename + req.file.originalname;
    fs.mkdir('./public/media/' + req.body.component + '/' + req.body.parent + '/thump/', { recursive: true }, (err) => {
        if (err) throw err;


        fs.rename(OldPath, NewPath, async function (err) {
            if (err) throw err
            if (req.file.mimetype.substring(0, 'image'.length) == 'image') {
                sharp(NewPath)
                    .rotate()
                    .resize(600)
                    .jpeg({ mozjpeg: true })
                    .toFile('./public/media/' + req.body.component + '/' + req.body.parent + '/thump/' + req.file.filename + req.file.originalname)
                    .then(data => {

                    })
                    .catch(err => {
                    });
            }
            var url = '';

            console.log(req.body.barcode);
            // console.log(req.body,req.file);
            const save = new filemanager({
                component: req.body.component,
                file: req.file.originalname,
                url: '/media/' + req.body.component + '/' + req.body.parent + '/' + req.file.filename + req.file.originalname,
                mimetype: req.file.mimetype,
                label: req.body.label,
                parent: req.body.parent,
                barcode: url,
                colors: req.body.colors,

                name: req.file.filename + req.file.originalname,
                path: '/media/' + req.body.component + '/' + req.body.parent + '/',
            });

            save.save(async function (err, applicant) {

                if (err) {
                    if (err.name === 'MongoError' && err.code === 11000) {
                        return res.status(422).send({
                            message: 'url is Available'
                        });
                    } else {
                        err = save.validateSync();
                        return res.status(422).send({
                            message: err
                        });
                    };
                } else {
                    let check = await filemanager.find({ parent: save.parent, star: true });
                    console.log(check.length);
                    if (check.length == 0) {

                        save.star = true;
                        await save.save();
                    }
                    if (req.body.barcode == 'true') {
                        url = await QRCode.toDataURL(`https://wallpaperdemo.ir/detail/${save.id}`);
                        save.barcode = url;
                        await save.save();

                    }
                    return res.status(200).send({
                        message: 'upload Completed',
                        data: save

                    });
                }
            });
        })
    });




};

// Retrieve and return all notes from the database.
exports.findAll = async (req, res) => {
    console.log(req.query);
    const list = await filemanager.find({ component: req.query.component, parent: req.query.parent });
    if (list == null) {
        return res.status(404).send({
            message: 'Not Found'
        });
    }
    return res.status(200).send({
        message: list
    });



};

// Find a single note with a noteId
exports.findOne = async (req, res) => {
    const list = await filemanager.findOne({ _id: req.params.Id });
    if (list == null) {
        return res.status(404).send({
            message: 'Not Found'
        });
    }
    return res.status(200).send({
        message: list
    });

};
exports.updatedetail = async (req, res) => {
    const item = await filemanager.findOne({ _id: req.params.Id });
    const { stylework,title, text,colors, link, color, description } = req.body;

    item.title = title;
    item.stylework = stylework;

    item.text = text;
    item.description = description;
    item.link = link;
    item.color = color;
    item.colors = colors;

    item.save();
    return res.status(200).send({
        message: 'okey'
    });

}
// Update a note identified by the noteId in the request
exports.update = async (req, res) => {
    const item = await filemanager.findOne({ _id: req.params.Id });


    await filemanager.updateMany({ parent: item.parent }, {
        star: false
    });
    item.star = true;
    item.save();
    return res.status(200).send({
        message: 'okey'
    });


};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res) => {
    const list = await filemanager.findOne({ _id: req.params.Id });
    const star = list.start;
    const parent = list.parent;

    if (list == null) {
        return res.status(404).send({
            message: 'Not Found'
        });
    }


    fs.unlink('./public' + list.url, function (err) {
    });

    await list.delete();
    const items = await filemanager.findOne({ parent: parent });

    if (star == true) {
        console.log('fuck');

        console.log(parent);

        if (items != null) {
            items.star = true;
            items.save();

        }
    }

    return res.status(200).send({
        message: 'Deleted File'
    });

};

