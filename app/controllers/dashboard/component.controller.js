

const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { assign } = require('nodemailer/lib/shared');
const components = require('../../models/component.model');
const filemanager = require('../../models/filemanager.model')
var fs = require('fs')
var  rimraf = require('rimraf')


exports.create = async (req, res) => {
    const { component,id,mode,parent} = req.body;
    let  waiteforcount= await components.find({ parent: parent}).count();
    const bg = new components({
        parent: parent,
        mode: mode,
        id:id,
        data:{
            text:''
        },
        component:component,
        ordered:waiteforcount++
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
 
    const list = await  components.find({parent:req.query.parent}).sort('ordered').populate('wallpaper');;

    if(list==null){
     return res.status(404).send({
         message: 'Not Found'
     });
 }
    return res.status(200).send({
     message: list ,
 });

};

// Find a single note with a noteId
exports.findOne =async (req, res) => {


 
};

// Update a note identified by the noteId in the request
exports.update = async (req, res) => {
        if(req.body.mode=="changelayout"){
            const bg = await  components.findOne({_id:req.params.Id});
        
            bg.cols=req.body.cols;
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

        }
        console.log(req.body);
        if(req.body.mode=="up"){
            const bg = await  components.findOne({_id:req.params.Id});
           // const bg = await  components.findOne({_id:req.params.Id});
           const target = await  components.find({parent:bg.parent,ordered: { $lte:bg.ordered }, _id: { $ne: bg.id }}).sort({'ordered': -1}).limit(1);
           if(target!=null){
               let first=bg.ordered;
               let two=target[0].ordered;
               bg.ordered=two;
               target[0].ordered=first;
               await  bg.save();
               await  target[0].save();
              return res.status(200).send({
                        message: 'add Success',
                        data:bg
                    });
           }
        }
        if(req.body.mode=="down"){
            const bg = await  components.findOne({_id:req.params.Id});
           // const bg = await  components.findOne({_id:req.params.Id});
           const target = await  components.find({parent:bg.parent,ordered: { $gte:bg.ordered }, _id: { $ne: bg.id }}).sort({'ordered': 1}).limit(1);
           if(target!=null){
               let first=bg.ordered;
               let two=target[0].ordered;
               bg.ordered=two;
               target[0].ordered=first;
               await  bg.save();
               await  target[0].save();
              return res.status(200).send({
                        message: 'add Success',
                        data:bg
                    });
           }
        }
        if(req.body.mode=="update"){
            const bg = await  components.findOne({_id:req.params.Id});
   
            const { data,defalang,lang } = await req.body;
            if(defalang==lang){
                bg.data=data;
            }else{
                bg[lang]=data;
            }
          
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

          
        }


};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res) => {
    const update = await  components.findOne({_id:req.params.Id});
     if(update==null){
        return res.status(404).send({
            message: 'Not Found'
        });
    }
    const filelist = await filemanager.find({'parent':update._id});
    for(i in filelist){
       rimraf('./public/media/'+filelist[i].component+'/'+filelist[i].parent, function (err) {
        
    });

   
      
    }
    await filemanager.deleteMany({'parent':update._id});
    await components.deleteOne({_id:req.params.Id});
    return res.status(200).send({
        message: 'Deleted Success'
       })
 
};

