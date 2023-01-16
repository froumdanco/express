

const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { assign } = require('nodemailer/lib/shared');
const setting = require('../../models/setting.model');
const { populate } = require('../../models/blog.model');
const  color  = require('../../models/color.model');
const  modestyle  = require('../../models/modestyle.model');
const  album  = require('../../models/album.model');
const  gallery  = require('../../models/gallery.model');
const article = require('../../models/blog.model');
const customer = require('../../models/customer.model');
const bloggroup = require('../../models/bloggroup.model');

exports.
    create = async (req, res) => {


};

// Retrieve and return all notes from the database.
exports.findAll = async (req, res) => {
    const application = await bloggroup.findOne({url:'Applications'}).populate({path:'child',populate:{path:'tocomponent',options:{
        sort:'ordered'
    }}});
     const endpage = await article.findOne({url:'firstpage'}).populate('mainimage').populate({path:'tocomponent',options:{
        sort:'ordered'
    },populate:{path:'wallpaper'}});
    
  //  const settingdata = await setting.findOne({}).select(['-telegrapapi', '-chanaltelegram']);;
 //   const colors = await color.find();
  //  const modestyles = await modestyle.find();
   // const slider = await gallery.findOne({url:'slider'}).populate('images');

   // const albums = await album.find().populate('mainimage').populate({path:'images',limit:8});
  //  const customers = await customer.find().populate({path:'mainimage'}).limit(9);

  //  const firstpage = await article.findOne({url:'firspage'}).populate('mainimage').populate({path:'tocomponent',populate:{path:'wallpaper'}});
  //  const orders = await article.findOne({url:'orders'}).populate('mainimage').populate({path:'tocomponent',populate:{path:'wallpaper'}});
    
    // const
    return res.status(200).send({
        application:application,
        endpage:endpage
    });



};

// Find a single note with a noteId
exports.findOne = async (req, res) => {


};

// Update a note identified by the noteId in the request
exports.update = async (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res) => {

};

