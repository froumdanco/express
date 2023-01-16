

const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { assign } = require('nodemailer/lib/shared');
const product = require('../../models/product.model');
const Tag = require('../../models/tags.model');
const { DeleteitemComponent } =require('../../controllers/dashboard/global');

exports.create = async (req, res) => {
    const { name,url,parent} = req.body;

    const bg = new product({
        name: name,
        url: url,
        parent:parent,
        publish:true,
        modeuser:'admin',

    });
    console.log(bg);

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
                message: 'add Success'
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
            const list = await  product.paginate({publish:req.query.status},options);
            return res.status(200).send({
                message: list
      
            });
          }else{
            const list = await  product.paginate({parent:find,publish:req.query.status},options);
            return res.status(200).send({
                message: list
      
            });
          }       


};

// Find a single note with a noteId
exports.findOne =async (req, res) => {

    const list = await  product.findOne({_id:req.params.Id}).populate('groups');;
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


    const update = await  product.findOne({_id:req.params.Id});
    if(update==null){
        return res.status(404).send({
            message: 'Not Found'
        });
    }
    const {defalang , lang ,brand ,special,firstpage,price, name , url ,text ,keywords,description,Available, publish,title,tags , telegram, refrence,specifications,Technical,Features,otherspecifications,pricesymbol} = req.body;
    await  tagmanager(tags);
  
    update.name=name;
    update.url=url;
    update.text=text;
    update.keywords=keywords;
    update.tags=tags;
    update.description=description;
    update.tags=tags;
    update.telegram=telegram;
    update.specifications=specifications;
    update.refrence=refrence;
    update.Technical=Technical;
    update.Features=Features;
    update.Available=Available;
    update.special=special;
    update.firstpage=firstpage;
    update.brand=brand;

    update.otherspecifications=otherspecifications;

    
    update.publish=publish;
    if(defalang==lang){
        update.text=text;
        update.keywords=keywords;
        update.description=description;
        update.title=title;
        update.name=name;
        update.title=title;
        update.price=price;
        update.pricesymbol=pricesymbol;

        update.telegram=telegram;

    }else{
        let save={
            name:name,
             text:text,
             keywords:keywords,
             description:description,
             title:title,
             price:price,
             telegram:telegram,

             pricesymbol:pricesymbol

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
                message: 'Update Succes'
            });
        }
      });
};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res) => {
    const update = await  product.findOne({_id:req.params.Id});
    await  DeleteitemComponent(update.id);
    await  product.deleteOne({_id:req.params.Id});
  
    return res.status(200).send({
        message: 'Deleted Success'
    });
};

