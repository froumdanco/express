const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const DB = mongoose.Schema({
    browsercode: {
        type: String,
        required: true,
    },
    modeltype: {
        type: String,
     
    },
    idcode: {
        type: String,
      

    },
   


}, {
    timestamps: true
},


);
DB.virtual('tofav',{
    ref: 'filemanager',
    localField: 'idcode',
    foreignField: '_id',
    justOne:true

});

DB.set('toObject', { virtuals: true });
DB.set('toJSON', { virtuals: true });

DB.plugin(mongoosePaginate);
module.exports = mongoose.model('fav', DB);