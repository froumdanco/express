var express = require('express');

var router = express.Router();
  const crud = require('../../app/controllers/view/hire.controller');

    // Create a new Note
    /**
 * @swagger
 * /v1/hire/:
 *   consumes:
 *     - application/json; charset=utf-8
 *   post:
 *     summary: HireForm
 *     tags: [Pages]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: 
 *       - in: path
 *         name: formdata
 *         schema:
 *           type: JSON
 *         required: true
 *         description: 
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
