const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const DB = mongoose.Schema({
    parnet: {
        type: String,
    },
    rate: {
        type: Number,
    },

    user: {
        type: String,

    },



}, {
    timestamps: true
},


);

// DB.virtual('toGroup', {
//     ref: 'fgroup',
//     localField: 'group',
//     foreignField: '_id',
//     justOne: true


// });
DB.set('toObject', { virtuals: true });
DB.set('toJSON', { virtuals: true });

module.exports = mongoose.model('frate', DB);