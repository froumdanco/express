var express = require('express');

var router = express.Router();
const crud = require('../../app/controllers/view/album');

// Create a new Note
router.post('/search', crud.searched);

 router.post('/', crud.create);
router.get('/detail/:Id', crud.ondetail);

// Retrieve all Notes
router.get('/', crud.findAll);
router.get('/fav', crud.favlist);

// Retrieve a single Note with noteId
router.get('/:Id', crud.findOne);

// Update a Note with noteId
router.put('/:Id', crud.update);

// Delete a Note with noteId
router.delete('/:Id', crud.delete);
module.exports = router;
