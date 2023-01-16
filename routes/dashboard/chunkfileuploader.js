const express = require('express')
const cors = require('cors');
const bodyParser= require('body-parser')
const multer = require('multer');
const fs = require('fs');
const FileChunked = require('file-chunked');
const chunk = require('../../app/models/chunk.model');
const video = require('../../app/models/video.model');
const mergeFiles = require('merge-files');
const { videoResize } = require('node-video-resize')

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'tmp')
  },
  filename: function (req, file, cb) {
 

    cb(null, file.fieldname + '-' + Date.now())
  }
})
  
var upload = multer({ storage: storage })

var router = express.Router();
 const crud = require('../../app/controllers/dashboard/filemanager.controller');

    // Create a new Note
 router.post('/', upload.single('file'),async (req, res, next) => {

  const {file, body} = req;
    if(body.chunking == 'true'){
        
        FileChunked.upload({
            chunkStorage:"tmp/"+body.uploadId, // where the uploaded file(chunked file in this case) are saved
            uploadId: body.uploadId,
            chunkIndex: body.chunkIndex,
          totalChunksCount: body.totalChunksCount,
          filePath: req.file.path,
        });
        const countdbcount = await chunk.find({originalname:req.file.originalname}).count();
   
          const chunckdb =await new chunk({
            name: req.file.path,
            originalname: req.file.originalname,
            parent:body.uploadId,
            oredered:countdbcount
        });
        
        await chunckdb.save();
      

      }
    
  res.json({ message: 'WELCOME' });
  
})

            // Retrieve all Notes
 router.get('/', async (req, res, next) => {
   let videosave=await video.findOne({parent:req.query.id});
          res.json({ message: videosave });

        });

            // Retrieve a single Note with noteId
        router.get('/:Id', async(req,res,next)=>{
          const countdbcount = await chunk.find({parent:req.params.Id}).sort('oredered');
         const meregitem=[];
         console.log(req.body);

         await countdbcount.forEach(element => {
            meregitem.push(element.name);
          });
          await mergeFiles(meregitem, 'tmp/'+req.params.Id+'.mp4').then(async (status) => {
            await   countdbcount.forEach(element => {
              fs.unlink(element.name, function (err) {
            
                
              });
            });
            await chunk.deleteMany({parent:req.params.Id});
            fs.mkdir('./public/video/'+req.params.Id, { recursive: true },async (err) => {
            
                    fs.rename( 'tmp/'+req.params.Id+'.mp4', './public/video/'+req.params.Id+'/'+req.params.Id+'.mp4',async function (err) {
                      const videosave =await new video({
                        name: '/video/'+req.params.Id+'/'+req.params.Id+'.mp4',
                        parent: req.params.Id,
                        url:req.params.Id+'.mp4',
                    });
                    
                    await videosave.save();
           
                    })
            });


        });;
      
       
          res.json({ message: 'success' });

        });


            // Update a Note with noteId
        router.put('/:Id',  async(req,res,next)=>{
          
        });

            // Delete a Note with noteId
        router.delete('/:Id', crud.delete);
module.exports = router;
