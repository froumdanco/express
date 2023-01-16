const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const DB = mongoose.Schema({
    name:{ 
         type:String,
         required: true, 
         unique: true
      },
 

}, {
    timestamps: true
},


);

DB.virtual('mainimage',{
    ref: 'filemanager',
    localField: '_id',
    foreignField: 'parent',
   
    justOne: true,
    options: { findOne: { star:true } } 

});
DB.virtual('groups',{
    ref: 'bloggroup',
    localField: 'parent',
    foreignField: '_id',
    justOne: true

});
DB.set('toObject', {virtuals: true});
DB.set('toJSON', {virtuals: true});

DB.plugin(mongoosePaginate);
module.exports = mongoose.model('tags', DB);