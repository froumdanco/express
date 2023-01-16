

const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { assign } = require('nodemailer/lib/shared');
const Blog = require('../../models/blog.model');
const Tag = require('../../models/tags.model');
const { DeleteitemComponent } =require('../../controllers/dashboard/global');


exports.create = async (req, res) => {
    const { name,url,parent} = req.body;

    console.log(parent);
    const bg = new Blog({
        name: name,
        url: url,
        parent:parent
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

    let  find=null;
       if(req.query.group){
            find=req.query.group;
       }
        const options = {
            page: req.query.page,
            limit: req.query.limit,
            populate:'groups'
            
          };
          if(find==null){
            const list = await  Blog.paginate({},options);
            return res.status(200).send({
                message: list
      
            });
          }else{
            const list = await  Blog.paginate({parent:find},options);
            return res.status(200).send({
                message: list
      
            });
          }       


};

// Find a single note with a noteId
exports.findOne =async (req, res) => {

    const list = await  Blog.findOne({_id:req.params.Id});;
    const tags= await Tag.find();

    if(list==null){
     return res.status(404).send({
         message: 'Not Found'
     });
 }
    return res.status(200).send({
     message: list ,
     tag: tags 
 });
 
};
 tagmanager =async (tags) => {
  for(const item in tags){
      let check=await  Tag.findOne({name:tags[item]});
      if(check==null){
            const savetag= new  Tag({
                name: tags[item]
            });
            await savetag.save();

      };
  }
}
// Update a note identified by the noteId in the request
exports.update = async (req, res) => {


    const update = await  Blog.findOne({_id:req.params.Id});
    if(update==null){
        return res.status(404).send({
            message: 'Not Found'
        });
    }
    const {defalang, lang, name , url ,text ,keywords,description, publish,title,tags ,parent, telegram, refrence} = req.body;
    await  tagmanager(tags);
    if(defalang==lang){

    update.name=name;
    update.url=url;
    update.text=text;
    update.keywords=keywords;
    update.tags=tags;
    update.description=description;
    update.tags=tags;
    update.telegram=telegram;
    update.parent=parent;
    update.refrence=refrence;

    
    update.publish=publish;
    update.title=title;
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
    }else {
        update.url=url;
        update.parent=parent;
        let save={
            name:name,
             text:text,
             keywords:keywords,
             tags:tags,
             description:description,
             telegram:telegram,
             refrence:refrence,
             title:title

         }
         update[lang]=save;
      
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
    }
};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res) => {
    const update =  Blog.findOne({_id:req.params.Id});
    await  DeleteitemComponent(req.params.Id);
 await  update.deleteOne({_id:req.params.Id});
  
    return res.status(200).send({
        message: 'Deleted Success'
    });
 
};

