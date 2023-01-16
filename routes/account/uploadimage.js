var express = require('express');

const crud = require('../../app/controllers/account/uploadimage.controller');
var multer  = require('multer')

var upload = multer({ dest: './temp/' })

  var router = express.Router();
             router.get('/star/:Id/:parent', crud.star);
             router.get('/up/:Id', crud.up);
             router.get('/down/:Id', crud.down);

    // Create a new Note
        router.post('/',upload.single('file'),crud.create);

            // Retrieve all Notes
        router.get('/', crud.findAll);

            // Retrieve a single Note with noteId
        router.get('/:Id', crud.findOne);

            // Update a Note with noteId
        router.put('/:Id', crud.update);

            // Delete a Note with noteId
        router.delete('/:Id', crud.delete);
module.exports = router;
