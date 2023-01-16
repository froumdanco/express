var express = require('express');
const crud = require('../../app/controllers/account/profile.controller');

  var router = express.Router();


    // Create a new Note
        router.post('/',crud.create);
            // Retrieve all Notes
        router.get('/', crud.findAll);
        router.post('/changprofile', crud.profileimage);

        router.put('/:Id', crud.update);

            // Retrieve a single Note with noteId
        router.get('/:Id', crud.findOne);

            // Update a Note with noteId
        router.put('/:Id', crud.update);

            // Delete a Note with noteId
        router.delete('/:Id', crud.delete);
module.exports = router;
