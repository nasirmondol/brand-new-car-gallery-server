const express = require('express')
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors')

app.use(cors())
app.use(express.json())
require('dotenv').config()


app.get('/', (req, res) => {
    res.send('Running the car gallery app')
})


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dsmrntz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const productCollection = client.db('car-gallery').collection('products')

        app.get('/products', async (req, res) => {
            const query = {};
            const products = await productCollection.find(query).toArray();
            res.send(products);
        })

    }
    finally {

    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log('listen to the car server on', port)
})