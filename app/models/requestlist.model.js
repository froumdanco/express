const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const DB = mongoose.Schema({
    name:{ 
        type:String,
         required: true, 
         },
    email:{ 
         type:String,
         required: true, 
      },
      description:{ 
        type:String,
        default:''
   
    },
    readed:{ 
        type:Boolean,
        default:false


    },
   
}, {
    timestamps: true
},


);


DB.set('toObject', {virtuals: true});
DB.set('toJSON', {virtuals: true});

DB.plugin(mongoosePaginate);
module.exports = mongoose.model('requestlist', DB);
