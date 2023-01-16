const mongoose = require('mongoose');
const filemanager = require('../../models/filemanager.model');
const components = require('../../models/component.model');
const video = require('../../models/video.model');
var fs = require('fs')
var  rimraf = require('rimraf')

exports.DeleteitemComponent = async (id) => {
        const list = await  components.find({parent:id});
        console.log(id);

        await Videofinder(id);

        for(i in list){
           await Filefinder(list[i].id);
         };

         await components.deleteMany({'parent':id});
         await Filefinder(id);
         
}
Filefinder =async (id) => {
        const filelist = await filemanager.find({'parent':id});

        for(i in filelist){
                rimraf('./public/media/'+filelist[i].component+'/'+filelist[i].parent, function (err) {
                });
                
        }          
        await filemanager.deleteMany({'parent':id});
       
}
Videofinder =async (id) => {
        const videoitem = await  video.find({parent:id});
      
        if(videoitem!=null){
                for(i in videoitem){

                       rimraf('./public/video/'+videoitem[i]._id, function (err) {
                        });
                        
                }          
                await video.deleteMany({parent:id});
        }     
 
       
}