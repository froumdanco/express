const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    title: { 
        type:String
    },
    keywords: { 
        type:String
    },
    description: { 
        type:String
    },
    lang: { 
        type:String
    },
    telegrapapi:{ 
        type:String
    },
    chanaltelegram:{ 
        type:String
    },
    SocailNetwork:{ 
        type:JSON
    },
    ContactUs:{ 
        type:JSON
    },
    
 
}, {
    timestamps: true
});

module.exports = mongoose.model('Setting', Schema);