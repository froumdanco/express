const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const DB = mongoose.Schema({
 
 
    css:{ 
        type:String,
        default:''
   
    },
    component:{ 
        type:String,
        default:''
   
    },
    ordered:{ 
        type:Number,

    },
     data:{ 
        type:JSON
        

    },
    parent:{ 
        type:String
    },
    mode:{ 
        type:String
    },
    cols:{ 
        type:Number,
        default:12
   

    },
    fa:{ 
        type:JSON
    },
    ar:{ 
        type:JSON
    },
    en:{ 
        type:JSON
    },

}, {
    timestamps: true
},


);


DB.virtual('wallpaper',{
    ref: 'filemanager',
    localField: '_id',
    foreignField: 'parent',
    justOne:true,
});
DB.set('toObject', {virtuals: true});
DB.set('toJSON', {virtuals: true});

DB.plugin(mongoosePaginate);
module.exports = mongoose.model('component', DB);