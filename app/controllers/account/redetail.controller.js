

const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const product = require('../../models/rsdetail.model');


exports.create = async (req, res) => {
    const { cat,name,mode,countries,neighborhood,features,bedroom,metter,basemetter,districts,price,prepayment,rent} = req.body;

    const bg = new product({
        name: name,
        mode:mode,
        parent:req.user._id,
        city:countries[0].id,
        country:countries[0].parent,
        neighborhood:neighborhood,
        bedroom:bedroom,
        metter:metter,
        price:price,
        prepayment:prepayment,
        cat:cat,
        rent:rent,
        basemetter:basemetter,
        districts:districts.id,
        features:features,
        modeuser:'user',
        userinput:req.user._id
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
                data: bg.id
            });
        }
      });
  
  

};

// Retrieve and return all notes from the database.
exports.findAll =async (req, res) => {

    let  find=null;
     
        const options = {
            page: req.query.page,
            limit:12,
            populate:'groups'
            
          };
         
            const list = await  product.paginate({parent:req.user._id},options);
            return res.status(200).send({
                message: list
      
            });
          


};

// Find a single note with a noteId
exports.findOne =async (req, res) => {

    const list = await  product.findOne({_id:req.params.Id,parent:req.user._id}).populate('groups');
    //const tags= await Tag.find();

    if(list==null){
     return res.status(404).send({
         message: 'Not Found'
     });
 }
    return res.status(200).send({
     message: list ,
   //  tag: tags 
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
    const { map, cat,name,mode,city,neighborhood,features,bedroom,metter,basemetter,districts,text,special,firstpage,price,prepayment,rent} = req.body;
   // await  tagmanager(tags);
        features: features,
    update.name=name;
    update.mode=mode;
    update.firstpage=firstpage;
    update.special=special;
    update.city=city;
    update.neighborhood=neighborhood;
    update.bedroom=bedroom;
    update.metter=metter;
    update.rent=rent;

    update.text= text;
    update.cat=cat;
    update.prepayment=prepayment;
    update.price=price;
    update.basemetter=basemetter;
    update.districts=districts;
    update.features=features;
    update.map=map;
    
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
    const update = await  product.findOne({_id:req.params.Id});
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

