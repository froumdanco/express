

const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { assign } = require('nodemailer/lib/shared');
const Blog = require('../../models/blog.model');
const setting = require('../../models/setting.model');

const request = require('request');


exports.create = async (req, res) => {
    let image='<img src="https://telegram.org/img/t_logo.png">';
    await request('https://api.telegram.org/bot1803304414:AAEz_xlQHrp8etSpWK51uA43lso-KTrC52s/sendMessage?chat_id=@afrangdev&text='+image+'&parse_mode=html',
    function (error, response, body) {
    if(response.statusCode==200){
        return res.status(200).send({
            message: body
        
        });
    }else{
        return res.status(404).send({
            message: response
        
        });
    }
       
   });

  

};

// Retrieve and return all notes from the database.
exports.findAll =async (req, res) => {

   


};

// Find a single note with a noteId
exports.findOne =async (req, res) => {
    let ref='';
        const  data= await Blog.findOne({_id:req.params.Id}).populate('mainimage');  

        // if(data.refrence){
        //     extratextra=extratextra+'\n Ref: '+data.refrence; 
        // }
        const extratextra='http://worldwidecryptonews.com'; 
        if(data.refrence){
          ref='Ref: '+data.refrence; 

        }
        const settingdata = await setting.findOne({lang:'en'});
       
                    let url =String(data.mainimage['url']);

                    let masterimage='https://api.worldwidecryptonews.com'+url;

            const messeges=encodeURIComponent('<strong>'+data.name+'</strong> \n'+data.telegram+'\n'+ref+'\n'+extratextra);    
                console.log(masterimage);
                console.log(masterimage);
            await request.post('https://api.telegram.org/bot'+settingdata.telegrapapi+'/sendPhoto?chat_id='+settingdata.chanaltelegram+'&photo='+masterimage+'&caption='+messeges+'&parse_mode=html',
            function (error, response, body) {
              
                    return res.status(200).send({
                        message: response
                     
                    });
              
                   
               });
    
      
       
      
     
 
};

// Update a note identified by the noteId in the request
exports.update = async (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res) => {

};

