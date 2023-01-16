var express = require('express');
const { body, validationResult } = require('express-validator');
const { check } = require('express-validator/check');
const User = require('../../app/models/users.model');
const bcrypt = require('bcrypt');

var router = express.Router();
const crud = require('../../app/controllers/dashboard/users.controller');

// Create a new Note
router.post('/',
    check('email').isEmail().not().isEmpty(),
    check('name').not().isEmpty(),
    check('lastname').not().isEmpty(),
    check('password').isLength({ min: 6 }).withMessage('must be at least 5 chars long'),
    async (req, res) => {
        var err = validationResult(req);
        if (!err.isEmpty()) {
            return res.status(422).send({
                message: err.mapped(),
            });
        } else {
            let count = await User.find({ email: req.body.email }).count();
            if (count != 0) {
                return res.status(422).send({
                    message: 'Email is already',

                });
            } else {
                const { name, email,staff, phone, password, rol, lastname } = req.body;
                const bg = new User({
                    name: name,
                    lastname: lastname,
                    email: email,
                    staff:staff,
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


            }

        }



    });

// Retrieve all Notes
router.get('/', crud.findAll);

// Retrieve a single Note with noteId
router.get('/:Id', crud.findOne);
router.put('/changepassword/:Id', check('password').isLength({ min: 6 }).withMessage('must be at least 5 chars long'),

    crud.changepassword

);

// Update a Note with noteId
router.put('/:Id', crud.update);

// Delete a Note with noteId
router.delete('/:Id', crud.delete);
module.exports = router;
