var express = require('express');

var router = express.Router();
const crud = require('../app/controllers/users.controller');
const { body, validationResult } = require('express-validator');

// Create a new Note
router.post('/', crud.create);

// Retrieve all Notes
router.get('/', crud.findAll);

// Retrieve a single Note with noteId
router.get('/:noteId', crud.findOne);

// Update a Note with noteId
router.put('/:noteId', crud.update);

// Delete a Note with noteId
router.delete('/:noteId', crud.delete);
module.exports = router;