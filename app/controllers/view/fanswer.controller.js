const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const fquestions = require('../../models/fquestion');
const fanswer = require('../../models/fanswer');
const swear = require('../../lib/swear');
var async = require('async');

exports.create = async (req, res) => {
   console.log(req.user.id);




};



// Retrieve and return all notes from the database.
exports.findAll = async (req, res) => {

};
exports.searched = async (req, res) => {

   //url:req.params.Id
};
// Find a single note with a noteId
exports.findOne = async (req, res) => {
   const q = await fquestions.findOne({ _id: req.params.Id }).populate([
      {
         path: 'toSubject',populate:{
            path:'toGroup'
         }
      },
   
      {
         path: 'toUser',
         select: ['-admin', '-usertype', '-email', '-password', '-createdAt', '-updatedAt']
      }]
   );
   const options = {
      page: req.query.page,
      limit: 20,
      sort: '-updatedAt',

      populate: [
         {
            path:'toLike'
        },
         {
            path: 'toUser',
            select: ['-admin', '-usertype', '-email', '-password', '-createdAt', '-updatedAt']
         }]

   };
   const filter = {
      publish: true,

      parent: q._id
   }
   const a = await fanswer.paginate(filter, options);
   async.forEachOf(a.docs, function (rec, callback) {
      let text = a.docs[a.docs.indexOf(rec)]['text'].split(" ")
         .map((word) => (swear.includes(word.toLowerCase()) ? "*****" : word))
         .join(" ");
      console.log(a.docs.indexOf(rec));
      a.docs[a.docs.indexOf(rec)]['text'] = text;

   }, function (err) {
      //execution comes here when array is fully iterated.
   }), function asyncComplete(err) {
      if (err) {
         console.warn('Error setting account info.', err);
      }

      callback(null);  // this is the change.
   };
   return res.status(200).send({
      message: {
         // q:q,
         q: q,
         a: a

      }
   });
   //url:req.params.Id
};

// Update a note identified by the noteId in the request
exports.update = async (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res) => {

};

