

const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { assign } = require('nodemailer/lib/shared');
const User = require('../../models/users.model');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');

exports.create = async (req, res) => {
    const { name, email, phone, password, rol, lastname } = req.body;


    const bg = new User({
        name: name,
        lastname: lastname,
        email: email,
        phone: phone,
        usertype: rol,
        password: bcrypt.hashSync(password, 10),
    });


    await bg.save(function (err, applicant) {
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
        } else {
            return res.status(200).send({
                message: 'add Success',
                data: bg
            });
        }
    });


};
// exports.create = async (req, res) => {

//     console.log('fuck');




// };

// Retrieve and return all notes from the database.
exports.findAll = async (req, res) => {
    const options = {
        page: req.query.page,
        limit: 10,

    };
    const list = await User.paginate({}, options);
    return res.status(200).send({
        message: list

    });


};

// Find a single note with a noteId
exports.findOne = async (req, res) => {
    const list = await User.findOne({ _id: req.params.Id });
    return res.status(200).send({
        message: list,
        id: req.query.id

    });

};
exports.changepassword = async (req, res) => {
    const bg = await User.findOne({ _id: req.params.Id });
    const { password } = req.body;

    bg.password = bcrypt.hashSync(password, 10)
    await bg.save(function (err, applicant) {
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
        } else {
            return res.status(200).send({
                message: 'change password',
                data: bg
            });
        }
    });

}
// Update a note identified by the noteId in the request
exports.update = async (req, res) => {
    const { name, email, phone, rol, lastname, staff } = req.body;
    const bg = await User.findOne({_id: req.params.Id })
    bg.name = name;
    // bg.email=email;
    bg.phone = phone;
    bg.lastname = lastname;
    bg.rol = rol;
    bg.staff = staff;

    await bg.save(function (err, applicant) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                console.log(err);
                return res.status(422).send({
                    message: 'email is Available'
                });
            } else {
                err = usersdb.validateSync();
                return res.status(422).send({
                    message: err
                });
            };
        } else {
            return res.status(200).send({
                message: 'add Success',
                data: bg
            });
        }
    });

};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res) => {

};

