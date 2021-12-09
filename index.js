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

//Main Function
async function run() {
    try{
        await client.connect();
        console.log('connected to DB')

        const database = client.db("CreativeAgencies");
        const servicesCollection = database.collection("services");
        const ordersCollection = database.collection("orders");

        //GET single service details
        app.get('/services/:id', async(req,res)=>{
            const id= req.params.id;
            const query = {_id:ObjectId(id)};
            const result = await servicesCollection.findOne(query);
            res.json(result)
        });
        //GET API (services load from DB to Front end)
        app.get('/services', async (req, res) =>{
            const cursor = servicesCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
        });
        //GET API (Orders load from DB to Front end)
        app.get('/orders', async (req, res) =>{
            const cursor = ordersCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
        });

        //POST Services (add services from frontend to DB)
        app.post('/services', async (req, res) =>{
            const service = req.body;
            const result = await servicesCollection.insertOne(service);
            //console.log(result);
            res.send(result)
        });
        //POST Orders (add orders info from frontend to DB)
        app.post('/orders', async (req, res) =>{
            const order = req.body;
            const result = await ordersCollection.insertOne(order);
            console.log(result);
            res.send(result)
        });

    }finally {
        //await client.close();
    }

} run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Creative Agency server is running!')
  })
  app.get ('/hello', (req, res) =>{
      res.send('hrkoku server running');
  }) 
  app.listen(port, () => {
    console.log(`Listening at ${port}`)
  })