const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const DB = mongoose.Schema({
    name:{ 
        type:String,
         required: true, 
         },

    oredered:{ 
        type:Number
      
   
    },
    parent:{ 
        type:String,
        required: true, 


    },
    originalname:{ 
        type:String,
        required: true, 


    },
 
}, {
    timestamps: true
},


);


module.exports = mongoose.model('chunk', DB);