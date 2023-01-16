

const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const ProductGroup = require('../../models/productgroup');
const product = require('../../models/product.model');
const { DeleteitemComponent } =require('../../controllers/dashboard/global');

exports.create = async (req, res) => {
    const { name , url } = req.body;
    const bg = new ProductGroup({
        name: name,
        url: url,
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
                message: 'add Sucess',
                data:bg
            });
        }
      });
  
  

};

// Retrieve and return all notes from the database.
exports.findAll = async (req, res) => {
    const list = await ProductGroup.find({}).select('name url _id');

    return res.status(200).send({
        message: list 
    });
};

// Find a single note with a noteId
exports.findOne = async (req, res) => {
   const list = await  ProductGroup.findOne({_id:req.params.Id});
   if(list==null){
    return res.status(404).send({
        message: 'Not Found'
    });
}
   return res.status(200).send({
    message: list 
});

};

// Update a note identified by the noteId in the request
exports.update =async  (req, res) => {
    const update = await  ProductGroup.findOne({_id:req.params.Id});
    if(update==null){
        return res.status(404).send({
            message: 'Not Found'
        });
    }
    const {defalang, lang, name , url ,text ,keywords,description, publish,title,specifications,Technical,Features,otherlabel,otherspecifications,companies} = req.body;
    update.url=url;
    update.specifications=specifications;
    update.Technical=Technical;
    update.Features=Features;
    update.otherlabel=otherlabel;
    update.otherspecifications=otherspecifications;
    update.companies=companies;

    update.publish=publish;

    if(defalang==lang){
        update.text=text;
        update.keywords=keywords;
        update.description=description;
        update.title=title;
        update.name=name;


    }else{
        let save={
            name:name,
             text:text,
             keywords:keywords,
             description:description,
             title:title

         }
         update[lang]=save;
    }
      update.save(function (err, applicant) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
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
                message: 'Update Success'
            });
        }
      });
  


};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res) => {
    const update = await  ProductGroup.findOne({_id:req.params.Id});
   const find = await  product.find({parent:update.id}).count();
   if(find!==0){
    return res.status(422).send({
              message: 'This Group Have Product . Please Delete this products'
        });
   }else{
    await  DeleteitemComponent(update.id);
    await  update.deleteOne({_id:req.params.Id});
  
    return res.status(200).send({
        message: 'Deleted Success'
    });


   }

};

