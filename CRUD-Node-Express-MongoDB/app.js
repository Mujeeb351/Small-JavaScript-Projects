const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000
const dbo = require('./db')
const ObjectID = dbo.ObjectID;

app.engine('hbs', exphbs.engine({layoutsDir:'views/', defaultLayout:'main',extname:'hbs'}))
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({extended:false}))


app.get('/', async (req,res)=>{

    let database = await dbo.getDatabase()
    const collection = database.collection('books') // create collection
    const cursor = collection.find({})
    let books = await cursor.toArray()

    let msg = ''
    let edit_id, edit_book;

    if(req.query.edit_id){
        edit_id = req.query.edit_id;
        edit_book = await collection.findOne({_id: new ObjectID(edit_id)})
    }

    if(req.query.delete_id){
        
       await collection.deleteOne({_id: new ObjectID(req.query.delete_id)})
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
    let database = await dbo.getDatabase();
    const collection = database.collection('books')
    let book = {title: req.body.title, author:req.body.author}
    await collection.insertOne(book);
    return res.redirect('/?status=1')
})

app.post('/update-book/:edit_id', async(req,res)=>{
    let database = await dbo.getDatabase();
    const collection = database.collection('books')
    let book = {title: req.body.title, author:req.body.author}

    let edit_id = req.params.edit_id;
    await collection.updateOne({_id: new ObjectID(edit_id)},{$set:book});
    return res.redirect('/?status=2')
})


app.listen(PORT, ()=>{
    console.log(`server listening port on: ${PORT}`);
})