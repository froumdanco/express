const mongoose = require('mongoose');

const Schema = mongoose.Schema({
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
        type:JSON,
        default:''
    },
    keywords:{ 
        type:JSON
        
        
    },
    description:{ 
        type:JSON
    },
    publish:{ 
        type:Boolean, default:false 
    },
    title:{ 
         type:JSON
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
    }
}, {
    timestamps: true
});

Schema.virtual('child',{
    ref: 'blog',
    localField: '_id',
    foreignField: 'parent',
        
});


Schema.set('toObject', {virtuals: true});
Schema.set('toJSON', {virtuals: true});


module.exports = mongoose.model('bloggroup', Schema);