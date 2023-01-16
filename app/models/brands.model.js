const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const DB = mongoose.Schema({
    name:{ 
        type:String,
         },
    website:{ 
         type:String,
      },
    text:{ 
        type:String,
        default:''
   
    },
    phone:{ 
        type:String,
    }
}, {
    timestamps: true
},


);

DB.virtual('mainimage',{
    ref: 'filemanager',
    localField: '_id',
    foreignField: 'parent',
   

});


DB.set('toObject', {virtuals: true});
DB.set('toJSON', {virtuals: true});

DB.plugin(mongoosePaginate);
module.exports = mongoose.model('brand', DB);
