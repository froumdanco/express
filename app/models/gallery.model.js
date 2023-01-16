const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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
    text:{ 
        type:String,
        default:''
   
    },
    parent:{ 
        type:String

    },
    keywords:{ 
        type:String
    },
    description:{ 
        type:String
    },
    publish:{ 
        type:Boolean, default:false 
    },
    title:{ 
         type:String
    },

}, {
    timestamps: true
},


);

DB.virtual('images',{
    ref: 'filemanager',
    localField: '_id',
    foreignField: 'parent',
   

});
 DB.set('toObject', {virtuals: true});
 DB.set('toJSON', {virtuals: true});

DB.plugin(mongoosePaginate);
module.exports = mongoose.model('gallery', DB);