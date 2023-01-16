const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const DB = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    text: {
        type: String,
        default: ''

    },
    keywords: {
        type: String
    },
    barcode: {
        type: String
    },
    description: {
        type: String
    },
    publish: {
        type: Boolean, default: true
    },

    telegram: {
        type: String
    },
    ordered: {
        type: Number
    }


}, {
    timestamps: true
},


);

DB.virtual('mainimage',{
    ref: 'filemanager',
    localField: '_id',
    foreignField: 'parent',
    justOne: true,
    options: { find: { component:'myalbum' } } 

});
DB.virtual('images',{
    ref: 'filemanager',
    localField: '_id',
    foreignField: 'parent',
    options: { find: { component:'album' } } 

});
DB.set('toObject', { virtuals: true });
DB.set('toJSON', { virtuals: true });

DB.plugin(mongoosePaginate);
module.exports = mongoose.model('album', DB);