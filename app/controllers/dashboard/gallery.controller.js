

const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const BlogGroup = require('../../models/gallery.model');


exports.create = async (req, res) => {
    const { name , url } = req.body;
    const bg = new BlogGroup({
        name: name,
        url: url,
    });
    await  bg.save(function (err, applicant) {
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
                message: 'add Sucess',
                data:bg
            });
        }
      });
  
  

};

// Retrieve and return all notes from the database.
exports.findAll = async (req, res) => {
   const options = {
        page: req.query.page,
        limit: req.query.limit,
        
      };
        const list = await  BlogGroup.paginate({},options);

    return res.status(200).send({
        message: list 
    });
};

// Find a single note with a noteId
exports.findOne = async (req, res) => {
   const list = await  BlogGroup.findOne({_id:req.params.Id});
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
    const update = await  BlogGroup.findOne({_id:req.params.Id});
    if(update==null){
        return res.status(404).send({
            message: 'Not Found'
        });
    }
    const { name , url ,text ,keywords,description, publish,title} = req.body;
    update.name=name;
    update.url=url;
    update.text=text;
    update.keywords=keywords;
    update.description=description;
    update.publish=publish;
    update.title=title;
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
    const update = await  BlogGroup.findOne({_id:req.params.Id});
    if(update==null){
        return res.status(404).send({
            message: 'Not Found'
        });
    }
    update.delete();
    return res.status(200).send({
        message: 'Deleted Success'
    });
};

