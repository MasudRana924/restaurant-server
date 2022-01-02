const express = require('express')
const { MongoClient} = require('mongodb');
const ObjectId = require('mongodb').ObjectId
const cors = require('cors');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000
// middleware 
app.use(cors())
app.use(express.json())
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hrpwo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect()
        const database = client.db('food_Hungry')
        console.log('database connected')
        // foods connection
        const foodsCollection = database.collection('foods')
        // order connection
        const ordersCollection = database.collection('orders')
        // user connection
        const usersCollection = database.collection('users')
        // review collections 
        const reviewsCollection = database.collection('reviews')

        //  Data section
         // Users section 
        // post user 
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.json(result)
        })
        app.get('/foods', async (req, res) => {
            const cursor = foodsCollection.find({})
            const foods = await cursor.toArray()
            res.send(foods)

        })

    }
    finally {

    }
}
run().catch(console.dir)
app.get('/', (req, res) => {
    res.send('food_Hungry is running under server')
})
app.listen(port, () => {
    console.log("server is running on", port)
})