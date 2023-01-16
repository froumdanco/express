const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const DB = mongoose.Schema({

    parent: {
        type: String,
        required: true,
    },
    liked:{
        type: Boolean,
        default:true
    },

    user: {
        type: String,

    },


}, {
    timestamps: true
},


);


DB.set('toObject', { virtuals: true });
DB.set('toJSON', { virtuals: true });

DB.plugin(mongoosePaginate);
module.exports = mongoose.model('likefroum', DB);