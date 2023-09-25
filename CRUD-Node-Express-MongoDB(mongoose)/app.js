const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000
const dbo = require('./db')
const bookModel = require('./models/bookModel')

dbo.getDatabase();

app.engine('hbs', exphbs.engine({
    layoutsDir:'views/', 
    defaultLayout:'main',
    extname:'hbs',
    runtimeOptions:{
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
}}))
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({extended:false}))

app.get('/', async (req,res)=>{
    
    let books = await bookModel.find({})

    let msg = ''
    let edit_id, edit_book;

    if(req.query.edit_id){
        edit_id = req.query.edit_id;        
        edit_book = await bookModel.findOne({_id: edit_id})
    }

    if(req.query.delete_id){
               
        let delete_id = req.query.delete_id
       await bookModel.deleteOne({_id: delete_id})
       return res.redirect('/?status=3')
    }

    switch (req.query.status) {
        case '1':
                msg = 'Data inserted successfully....'
            break;

        case '2':
                msg = 'Data updated successfully....'
            break;

        case '3':
                msg = 'Data deleted successfully....'
            break;
    
        default:
            msg = ''
            break;
    }

    res.render('main', {msg, books, edit_id, edit_book})
})

app.post('/store-book', async(req,res)=>{
    
    const book = new bookModel({title: req.body.title, author:req.body.author})
    book.save()
    
    return res.redirect('/?status=1')
})

app.post('/update-book/:edit_id', async(req,res)=>{

    let edit_id = req.params.edit_id;
    await bookModel.findOneAndUpdate({_id: edit_id}, {title: req.body.title, author:req.body.author})
    return res.redirect('/?status=2')
})


app.listen(PORT, ()=>{
    console.log(`server listening port on: ${PORT}`);
})