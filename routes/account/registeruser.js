/**
 * @swagger
 * /v1/register/:
 *   consumes:
 *     - application/json; charset=utf-8
 *   post:
 *     summary: Register New User
 *     tags: [Auth And Login]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Name
 *       - in: path
 *         name: family
 *         schema:
 *           type: string
 *         required: true
 *         description: Last Name
 *       - in: path
 *         name: password
 *         schema:
 *           type: password
 *         required: true
 *         description: password 
  *       - in: path
 *         name: mobile
 *         schema:
 *           type: number
 *         required: true
 *         description: mobile 12 
 *     responses:
 *       200:
 *         description: Success
 *         contens:
 *           application/json:
 *       404:
 *         description: Error 
 */
var express = require('express');
const { body, check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

var router = express.Router();
const crud = require('../../app/controllers/account/registeraccount.controller');
const users = require('../../app/models/users.model');

// Create a new Note
router.post('/',

  body('password')
    .isLength({ min: 8 })
    .withMessage('must be at least 8 chars long')
    .matches(/\d/)
    .withMessage('must contain a number'),
  body('name').notEmpty().withMessage('name required'),
  body('lastname').notEmpty().withMessage('family required'),
  body('email').custom(async (value, { req }) => {
    let user = await users.findOne({ email: value }).count();
    if (user != 0) {


      throw new Error('You have already registered');

    }
    return true;

  }),
  body('confirm_password').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }

    // Indicates the success of this synchronous custom validator
    return true;
  }),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    } else {
      const { mobile, name, lastname, email, password } = req.body;
      const bg = new users({
        name: name,
        lastname: lastname,
        usertype: 2,
        email: email,
        password: bcrypt.hashSync(password, 10),
      });
      await bg.save();
      let JWTTken = JWT.sign({ id: bg._id, email: bg.email }, process.env.JWD_SECRET);
      return res.status(200).send({
        token: JWTTken,
        message: 'wellcome'

      });

    }
  },

);
// Retrieve all Notes
router.get('/', crud.findAll);

// Retrieve a single Note with noteId
router.get('/:Id', crud.findOne);

// Update a Note with noteId
router.put('/:Id', crud.update);

// Delete a Note with noteId
router.delete('/:Id', crud.delete);
module.exports = router;
