const user = require('../../models/users.model');
const forget = require('../../models/forget.model');
var nodemailer = require('nodemailer');
const emailConfig = require('../../../config/emailservice.config');
const { from } = require('multistream');
let minuteslastemail = 3;
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
var passwordValidator = require('password-validator');

const JWT = require('jsonwebtoken');

let minlastrequesttime = 60;
exports.create = async (req, res) => {
    let users = await user.findOne({ email: req.body.email });
    if (users == null) {
        return res.status(422).send({
            message: 'not found',
            error: 4
        });
    }
    let con = await forget.find({ parent: users.id }).count();
    let code = Math.floor(Math.random() * (99999 - 11111) + 11111);
    const bg = new forget({
        code: code,
        parent: users.id,
        confrim: false,
        expired: false

    });
    var transporter = nodemailer.createTransport({
        service: emailConfig.service,

        auth: {
            user: emailConfig.username,
            pass: emailConfig.password
        }

    });
    if (con != 0) {
        let lastrequest = await forget.findOne({ parent: users.id }).sort({ 'updatedAt': 'desc' });
        var startDate = new Date();
        // Do your operations
        var endDate = lastrequest.updatedAt;
        var minletter = Math.round(((startDate.getTime() - endDate.getTime()) / 1000) / 60);
        let totalminutes = minuteslastemail - minletter;
        if (totalminutes > 0) {
            return res.status(422).send({
                message: `about ${Math.abs(totalminutes)} minutes later try again to send forget password - check your inbox or spambox `,
                error: totalminutes
            });
        }

    }
    await bg.save();
    res.render('email', { email: users.email, code: code, name: users.name, url: emailConfig.url }, function (err, final_html) {
        if (err) throw err; // TODO: handle errors better

        var mailOptions = {
            from: emailConfig.username,
            to: users.email,
            subject: 'Foreget Password Danco Coin',
            html: final_html

        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.status(200).send({
                    message: error
                });
            } else {
                console.log('Email sent: ' + info.response);
                return res.status(200).send({
                    message: info.response
                });
            }

        });
        // call node-mailer with `mailOptions` here ...
    });
    // return res.status(200).send({
    //     message: Math.floor(Math.random() * (99999 - 11111) + 11111)
    // });
};
function sendemail() {

}

// Retrieve and return all notes from the database.
exports.findAll = async (req, res) => {




};

// Find a single note with a noteId
exports.findOne = async (req, res) => {


};

// Update a note identified by the noteId in the request
exports.update = async (req, res) => {
    const { email, password, confrimpassword, code } = req.body;
    var schema = new passwordValidator();
    schema.is().min(8).has().digits(2).has().not().spaces();

    let users = await user.findOne({ email: email });

    if (users == null) {
        return res.status(422).send({
            message: 'not found',
            error: 9
        });
    }
    let lastrequest = await forget.findOne({ parent: users.id }).sort({ 'updatedAt': 'desc' });
    if (code == undefined) {
        return res.status(422).send({
            message: `Code is empty`,
            error: 12
        });
    }
    if (lastrequest == null) {
        return res.status(422).send({
            message: 'please  send request revocery code',
            error: 5
        });
    }
    var startDate = new Date();
    // Do your operations
    var endDate = lastrequest.updatedAt;
    var minletter = Math.round(((startDate.getTime() - endDate.getTime()) / 1000) / 60);
    let totalminutes = minlastrequesttime - minletter;
    if (totalminutes < 0) {
        return res.status(422).send({
            message: `Last recovery code is expired . please  Request new Recoverycode `,
            error: 11
        });
    }
    if (lastrequest.code != code) {
        return res.status(422).send({
            message: `Code is wrong , try again`,
            error: 15
        });
    }
    if (password == null || password == undefined) {
        return res.status(422).send({
            message: `Password is Empty`,
            error: 16
        });
    }
    if (password != confrimpassword) {
        return res.status(422).send({
            message: `Password not match with confrim password`,
            error: 17
        });
    }
    if (schema.validate(password) == false) {
        return res.status(422).send({
            message: schema.validate(password, { list: true, details: true }),
            error: 18
        });
    }
    let hash = bcrypt.hashSync(password, 10);
    users.password = hash;
    users.save();
    await forget.remove({ parent: users.id });
    return res.status(200).send({
        message: 'success change password'
    });
};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res) => {

};

