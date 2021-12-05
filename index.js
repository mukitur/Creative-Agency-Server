const express = require('express')
const app = express();

const cors = require('cors');
require('dotenv').config();

const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const port = process.env.PORT || 8000

//middleware add
app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.adlv3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri)



app.get('/', (req, res) => {
    res.send('Creative Agency server is running!')
  })
  app.get ('/hello', (req, res) =>{
      res.send('hrkoku server running');
  }) 
  app.listen(port, () => {
    console.log(`Listening at ${port}`)
  })