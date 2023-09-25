const mongoose = require('mongoose')

async function getDatabase(){
    mongoose.connect('mongodb://127.0.0.1:27017/library')
    .then(()=>{
        console.log('database successfully connected......');
    })
    .catch(()=>{
        console.log('database not connected......');
    })
    
}

module.exports = {
    getDatabase
}