const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const Album = require('../../models/album.model');
const filrmanager = require('../../models/filemanager.model');

const fav = require('../../models/fav.models');

exports.create = async (req, res) => {


};
exports.ondetail = async (req, res) => {
    const Albums = await filrmanager.findOne({_id:req.params.Id})
    .populate({path:'album'}).populate({path:'images',populate:{path:'tofav'}}).populate({path:'tofav'});
    return res.status(200).send({
        message: Albums,

    });
//url:req.params.Id
};
exports.favlist = async (req, res) => {
   
    const favlist= await fav.find({browsercode:req.query.code}).populate('tofav').exec();
   
    return res.status(200).send({
        message: favlist,

    });
};

// Retrieve and return all notes from the database.
exports.findAll = async (req, res) => {

   const Albums = await Album.find().populate({path:'mainimage',populate:{path:'tofav'}});
   
    return res.status(200).send({
        message: Albums,

    });
};
exports.searched = async (req, res) => {
    const { page,album,style,colors } = req.body;

    const options = {
        page: page,
        limit: 15,
        populate:{path:'tofav'
         ,match: { browsercode:req.query.code }
         },
       
        
        
      };
      let find={};
      if(style!=null){
        find['stylework.name']=style;
       
      };
      if(colors!=null){
          
        find['colors.name']=colors.split(',');
       
      };
      if(album!=null){
        const findalbum =await Album.findOne({name:album});
        if(findalbum!=null){
          find.parent=findalbum._id;
        }
     
    };
    console.log(find);
    const images =await filrmanager.paginate(find,options);
    return res.status(200).send({
        message: images,

    });
//url:req.params.Id
};
// Find a single note with a noteId
exports.findOne = async (req, res) => {

    const Albums = await Album.findOne({code:req.params.Id});
   if(Albums==null){
    return res.status(404).send({
        message: 'not found'

    });
   }
    const options = {
        page: req.query.page,
        limit: 16,
        populate:{path:'tofav'

         ,match: { browsercode:req.query.code }
         }
         ,
       
        
        
      };
    const images =await filrmanager.paginate({parent:Albums._id,component:'album'},options);
//     .populate({path:'images',
//     populate:{path:'tofav'

// ,match: { browsercode:req.query.code }
// }
// }
//     ).populate('mainimage');
    return res.status(200).send({
        message: Albums,
        image: images,
        browsersascode:req.fingerprint['hash']

    });
//url:req.params.Id
};

// Update a note identified by the noteId in the request
exports.update = async (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res) => {

};


