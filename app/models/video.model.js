const mongoose = require('mongoose');

const DB = mongoose.Schema({
    name:{ 
        type:String,
         required: true, 
         },
    url:{ 
         type:String,
         required: true, 
         unique: true
      },
    parent:{ 
        type:String,
        default:''
   
    },
      
    description:{ 
        type:String
    },

}, {
    timestamps: true
},


);

// DB.virtual('mainimage',{
//     ref: 'filemanager',
//     localField: '_id',
//     foreignField: 'parent',
   
//     justOne: true,
//     options: { findOne: { star:true } } 

// });
// DB.virtual('groups',{
//     ref: 'bloggroup',
//     localField: 'parent',
//     foreignField: '_id',
//     justOne: true

// });
// DB.set('toObject', {virtuals: true});
// DB.set('toJSON', {virtuals: true});

//DB.plugin(mongoosePaginate);
module.exports = mongoose.model('video', DB);