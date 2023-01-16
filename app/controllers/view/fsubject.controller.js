const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const fsubject = require('../../models/fsubjects');
const fanswer= require('../../models/fquestion');

exports.create = async (req, res) => {
   
  

};

exports.createcode = async (req, res) => {
   
  
};

// Retrieve and return all notes from the database.
exports.findAll = async (req, res) => {
    // const Group = await fgroup.find().populate('tosubject');
   
    // return res.status(200).send({
    //     message: Group,

    // });
  
};
exports.searched = async (req, res) => {
   
//url:req.params.Id
};
// Find a single note with a noteId
exports.findOne = async (req, res) => {
    const options = {
        page: req.query.page,
        limit:40,
        populate:{
            path:'toUser',
            select:['-admin','-usertype','-email','-password','-createdAt','-updatedAt']
        }
     };
    const Group = await fsubject.findOne({_id:req.params.Id,publish:true}).populate({path:'toGroup'});
    const answer= await fanswer.paginate({parent:Group.id,publish:true},options)
   
   
    return res.status(200).send({
        message: Group,
        answer : answer

    });
//url:req.params.Id
};

// Update a note identified by the noteId in the request
exports.update = async (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res) => {

};

