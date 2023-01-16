var express = require('express');

var router = express.Router();
const crud = require('../../app/controllers/dashboard/brand.controller');

// Create a new Note
router.post('/', crud.create);

// Retrieve all Notes
router.get('/', crud.findAll);

// Retrieve a single Note with noteId
router.get('/:Id', crud.findOne);

// Update a Note with noteId
router.put('/:Id', crud.update);

// Delete a Note with noteId
router.delete('/:Id', crud.delete);
module.exports = router;
