const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema({
    file: {
        type: String,
    },
    name: {
        type: String,
    },
    component: {
        type: String,
    },
    description: {
        type: String,
    },
    title: {
        type: String,
    },
    text: {
        type: String,
    },
    user: {
        type: String,
    },
    link: {
        type: String,
    },
    color: {
        type: String,
    },
    parent: {
        type: String
    },
    mimetype: {
        type: String

    },
    url: {
        type: String

    },
    path: {
        type: String

    },
    barcode: {
        type: String

    },
    colors: {
        type: JSON

    },
    stylework: {
        type: JSON

    },
    star: {
        type: Boolean, default: false
    },

    label: {
        type: String
    },
    publish: {
        type: Boolean, default: true
    },
    ordered: {
        type: Number
    },


}, {
    timestamps: true
});

Schema.virtual('album',{
    ref: 'album',
    localField: 'parent',
    foreignField: '_id',
    justOne: true

});
Schema.virtual('images',{
    ref: 'filemanager',
    localField: '_id',
    foreignField: 'parent',

});
Schema.virtual('tofav',{
    ref: 'fav',
    localField: '_id',
    foreignField: 'idcode',
    count: true

});
Schema.set('toObject', { virtuals: true });
Schema.set('toJSON', { virtuals: true });
Schema.plugin(mongoosePaginate);

module.exports = mongoose.model('filemanager', Schema);