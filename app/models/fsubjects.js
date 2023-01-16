const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const DB = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    group: {
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

DB.virtual('toGroup', {
    ref: 'fgroup',
    localField: 'group',
    foreignField: '_id',
    justOne:true
});
DB.virtual('toAnswer', {
    ref: 'fquestion',
    localField: '_id',
    foreignField: 'parent',

});
DB.virtual('toAnswerCount', {
    ref: 'fquestion',
    localField: '_id',
    foreignField: 'parent',
    count:true
});

DB.set('toObject', { virtuals: true });
DB.set('toJSON', { virtuals: true });

DB.plugin(mongoosePaginate);
module.exports = mongoose.model('fsubject', DB);