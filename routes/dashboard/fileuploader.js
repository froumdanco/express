var express = require('express');
var multer  = require('multer')
var upload = multer({ dest: './temp/' })

var router = express.Router();
  const crud = require('../../app/controllers/dashboard/filemanager.controller');

    // Create a new Note
        router.post('/', upload.single('file'), crud.create);
        router.put('/edit/:Id', crud.updatedetail);

            // Retrieve all Notes
        router.get('/', crud.findAll);

            // Retrieve a single Note with noteId
        router.get('/:Id', crud.findOne);

            // Update a Note with noteId
        router.put('/:Id', crud.update);

            // Delete a Note with noteId
        router.delete('/:Id', crud.delete);
module.exports = router;
