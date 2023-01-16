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
        type:String,
        required: true, 


    },
     tags:{ 
        type:JSON

    },
    refrence:{ 
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
    telegram:{ 
        type:String
   },
   tr:{ 
    type:JSON
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

DB.virtual('mainimage',{
    ref: 'filemanager',
    localField: '_id',
    foreignField: 'parent',
   
    justOne: true,
    options: { findOne: { star:true } } 

});

DB.virtual('tovideo',{
    ref: 'video',
    localField: '_id',
    foreignField: 'parent',
   
    justOne: true,

});
DB.virtual('tocomponent',{
    ref: 'component',
    localField: '_id',
    foreignField: 'parent',
    sort:'ordered'
   
})
DB.virtual('groups',{
    ref: 'bloggroup',
    localField: 'parent',
    foreignField: '_id',
    justOne: true

});
DB.set('toObject', {virtuals: true});
DB.set('toJSON', {virtuals: true});

DB.plugin(mongoosePaginate);
module.exports = mongoose.model('blog', DB);