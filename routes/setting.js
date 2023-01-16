var express = require('express');

var router = express.Router();
  const setting = require('../app/controllers/setting.controller');

    // Create a new Note
        router.post('/', setting.create);

            // Retrieve all Notes
        router.get('/', setting.findAll);

            // Retrieve a single Note with noteId
        router.get('/:noteId', setting.findOne);

            // Update a Note with noteId
        router.put('/:noteId', setting.update);

            // Delete a Note with noteId
        router.delete('/:noteId', setting.delete);
module.exports = router;
