const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const fquestions = require('../../models/fquestion');
const fanswer = require('../../models/fanswer')


exports.create = async (req, res) => {
    const { text, parent } = req.body;
  
  const ans=new fanswer({
    text:text,
    parent:parent,
    user:req.user._id
  })

    await ans.save(async function (err, applicant) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                console.log(err);
                return res.status(422).send({
                    message: 'url is Available'
                });
            } else {
                err = ans.validateSync();
                return res.status(422).send({
                    message: err
                });
            };
        } else {
          
            await ans.save();
            return res.status(200).send({
                message: 'add Success',
                data: ans
            });
        }
    });




};



// Retrieve and return all notes from the database.
exports.findAll = async (req, res) => {

};
exports.searched = async (req, res) => {

   //url:req.params.Id
};
// Find a single note with a noteId
exports.findOne = async (req, res) => {
   
   //url:req.params.Id
};

// Update a note identified by the noteId in the request
exports.update = async (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res) => {

};

