const { check } = require("express-validator");
const nodemailer = require("nodemailer");
const db = require('../../models/fquestion.js');


exports.create = async (req, res) => {
    if(req.user.confrimemail==false){
        return res.status(422).send({
            message: 'please confrim your email'
        }); 
    }
    const { title, description,parent} = req.body;
    const bg = new db({
        title: title,
        description: description,
        parent:parent,
        user:req.user.id
    });
   let  check = await db.countDocuments
   ({parent:parent,staff:false,user:req.user.id,"createdAt":{$gt:new Date(Date.now() - 24*60*60 * 1000)}});
  check ==0 ?
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
      })
      :   res.status(423).send({
        message: 'You can ask only one question in this group in last 24 hour'
    });

};
exports.findAll =async (req, res) => {

};
exports.findOne =async (req, res) => {
}
// Update a note identified by the noteId in the request
exports.update = async (req, res) => {
 
};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res) => {
  
};
//sedighi37517!@#
