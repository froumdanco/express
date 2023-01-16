var express = require('express');

var router = express.Router();
  const crud = require('../../app/controllers/view/firstpage.controller');

    // Create a new Note
    /**
 * @swagger
 * /v1/firstpage/:
 *   consumes:
 *     - application/json; charset=utf-8
 *   get:
 *     summary: Firstpages
 *     tags: [Pages]
 
 *     responses:
 *       200:
 *         description: settingdata,SocailNetwork,category,listcity,adverslast,about
 *         contens:
 *           application/json:
 *       404:
 *         description: Error 
 */
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
