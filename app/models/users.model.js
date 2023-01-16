const mongoose = require('mongoose');
const { isEmail } = require('validator');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema({

    emailvalid:false,
    usertype:{
      type:Number,
      default:1
    },
    admin:{
        type:Boolean,
        default: false
    },
    name:{
      type:String  
    },
    lastname:{
        type:String
    },
    email:{
        type:String,
        required: true,
        unique: true
   },
    phone:{
        type:String
    },
    avatar:{
        type:String
    },

    solgen:{
        type:String
    },
    confrimemail:{
        default:false,
        type:Boolean
    },
    staff:{
        default:false,
        type:Boolean
    },
    password:{
        min: [8, 'Must be at least 6, got {VALUE}'],
        type:String,
        required: true
    },
}, {
    timestamps: true
});
Schema.virtual('todetail',{
    ref: 'rsdetail',
    localField: '_id',
    foreignField: 'parent',

});
Schema.virtual('todetailtruecount',{
    ref: 'rsdetail',
    localField: '_id',
    foreignField: 'parent',
    options: {find:{publish: true }},
    count: true // And only get the number of docs

});
Schema.virtual('todetailfalsecount',{
    ref: 'rsdetail',
    localField: '_id',
    foreignField: 'parent',
    options: {find:{publish: false }},

    count: true // And only get the number of docs

});

Schema.set('toObject', { virtuals: true });
Schema.set('toJSON', { virtuals: true });


Schema.plugin(mongoosePaginate);

module.exports = mongoose.model('users', Schema);       