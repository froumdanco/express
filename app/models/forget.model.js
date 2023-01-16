const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const DB = mongoose.Schema({
    code:{ 
        type:String,
         },
    parent:{ 
         type:String,
      },
    confrim:{ 
        type:Boolean,
        default:false
   
    },
    expired:{ 
        type:Boolean,
        default:false
    }
}, {
    timestamps: true
},


);




DB.set('toObject', {virtuals: true});
DB.set('toJSON', {virtuals: true});

DB.plugin(mongoosePaginate);
module.exports = mongoose.model('forgetlist', DB);
