

const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { assign } = require('nodemailer/lib/shared');
const Customer = require('../../models/brands.model');


exports.create = async (req, res) => {
    const { name,text,website,phone} = req.body;

    const bg = new Customer({
        name: name,
        text: text,
        website: website,
        phone:phone
    });

    await  bg.save(function (err, applicant) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                    console.log(err);
                return res.status(422).send({
                    message: 'url is Available'
                });
            } else {
                err = bg.validateSync();
                return res.status(422).send({
                    message: err
                });
            };
        }else {
            return res.status(200).send({
                message: 'add Success',
                data:bg
            });
        }
      });
  
  

};

// Retrieve and return all notes from the database.
exports.findAll =async (req, res) => {
          const options = {
            page: req.query.page,
            limit: req.query.limit,
            populate:'mainimage'
            
          };
         
           const list = await  Customer.find();
            return res.status(200).send({
                message: list
      
            });
           


};

// Find a single note with a noteId
exports.findOne =async (req, res) => {

    const list = await  Customer.findOne({_id:req.params.Id});;

    if(list==null){
     return res.status(404).send({
         message: 'Not Found'
     });
 }
    return res.status(200).send({
     message: list ,
 });
 
};

// Update a note identified by the noteId in the request
exports.update = async (req, res) => {


    const update = await  Customer.findOne({_id:req.params.Id});
    if(update==null){
        return res.status(404).send({
            message: 'Not Found'
        });
    }
    const {name,text,website,phone} = req.body;
  


        let save={
            name: name,
            text: text,
            website: website,
            phone:phone
             }
      
          update.save(function (err, applicant) {
            if (err) {
                if (err.name === 'MongoError' && err.code === 11000) {
                    return res.status(422).send({
                        message: 'url is Available'
                    });
                } else {
                    err = update.validateSync();
                    return res.status(422).send({
                        message: err
                    });
                };
            }else {
                return res.status(200).send({
                    message: 'Update Succes'
                });
            }
          }); 
    
};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res) => {
    const update =  Customer.findOne({_id:req.params.Id});
 await  update.deleteOne({_id:req.params.Id});
  
    return res.status(200).send({
        message: 'Deleted Success'
    });
 
};

