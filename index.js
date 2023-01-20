const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

//require mongodb

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


//require cors 
const cors = require('cors');
// const { query } = require('express');

// body parser
app.use(express.json());

//cors
app.use(cors());

//require dotenv
require('dotenv').config();


const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    const usersCollection = client.db('friend-book').collection('users');


    app.post('/users', async (req, res) => {
        const user = req.body;
        const result = await usersCollection.insertOne(user);
        console.log(result);
        res.send(result);
    });

    app.get('/users', async (req, res) => {
        const query = {};
        const users = await usersCollection.find(query).toArray();
        res.send(users);
    });


}

run().catch(err => console.log(err));

app.listen(port, () => {
    console.log(`server is running on  ${port}`)
});
