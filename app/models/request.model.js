const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const DB = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    data: {
        type: JSON
    },
    status: {
        type: Number,
        default: 0,

    },
    description: {
        type: String,

    },


}, {
    timestamps: true
},


);


DB.set('toObject', { virtuals: true });
DB.set('toJSON', { virtuals: true });

DB.plugin(mongoosePaginate);
module.exports = mongoose.model('request', DB);