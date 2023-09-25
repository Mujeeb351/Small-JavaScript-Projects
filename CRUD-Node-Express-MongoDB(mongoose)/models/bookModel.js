const mongoose = require('mongoose')

const bookScheema = new mongoose.Schema({
    title: String,
    author: String
})

const bookModel = mongoose.model('books', bookScheema )

module.exports = bookModel
