const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const DB = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

    completedtext: {
        type: String,
        default: ''

    },

    user: {
        type: String
    },
    parent: {
        type: String
    },
    publish: {
        type: Boolean,
        default: true
    },


}, {
    timestamps: true
},


);

DB.virtual('toUser', {
    ref: 'users',
    localField: 'user',
    foreignField: '_id',
    justOne: true


});
DB.virtual('toSubject',{
    ref:'fsubject',
    localField:'parent',
    foreignField:'_id',
    justOne:true
})
DB.virtual('toLike',{
    ref:'likefroum',
    localField:'_id',
    foreignField:'parent',
    count:true
});

DB.set('toObject', { virtuals: true });
DB.set('toJSON', { virtuals: true });

DB.plugin(mongoosePaginate);
module.exports = mongoose.model('fquestion', DB);