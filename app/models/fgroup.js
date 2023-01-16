const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const DB = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    text: {
        type: String,
        default: ''

    },
 
    keywords: {
        type: String
    },
    description: {
        type: String
    },
    publish: {
        type: Boolean, default: true
    },


}, {
    timestamps: true
},


);

DB.virtual('tosubject', {
    ref: 'fsubject',
    localField: '_id',
    foreignField: 'group',


});
DB.set('toObject', { virtuals: true });
DB.set('toJSON', { virtuals: true });

DB.plugin(mongoosePaginate);
module.exports = mongoose.model('fgroup', DB);