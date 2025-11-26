const express = require('express')
const cors = require('cors')
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 3000

//middleware
app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://TravelEaseDbUser:zDh5WF4QCoT42of5@cluster0.mrbmxyw.mongodb.net/?appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/', (req, res) => {
  res.send('smart server running')
})

async function run() {
  try {

    // Connect to the "sample_mflix" database and access its "movies" collection
    const database = client.db("travelEase_db");
    const productCollection = database.collection("allVehicles");
    const usersCollection = database.collection("addVehicle")
    const bookNowCollection = database.collection("bookNow")

    //add vehicles
    app.post('/addVehicle', async(req, res)=>{
        const newUser = req.body;
        newUser.createdAt = new Date(); 
        const result = await usersCollection.insertOne(newUser);
        res.send(result);
    })

    //latest vehicles
    app.get('/latest-vehicles',async(req,res)=>{
        const cursor = productCollection.find().sort({createdAt: -1}).limit(6);
        const result = await cursor.toArray();
        res.send(result)
    })

    app.get('/latest-vehicles/:id', async (req, res)=>{
        const id = req.params.id;
        const query = { _id: new ObjectId(id)}
        const result = await productCollection.findOne(query);
        res.send(result)
    })

    // app.get('/latest-vehicles/:id',async(req,res)=>{
    //     // const cursor = productCollection.find().sort({createdAt: -1}).limit(6);
    //     // const result = await cursor.toArray();
    //     // res.send(result)
    //     const id = req.params.id;
    //     const query = { _id: new ObjectId(id)}
    //     const result = await productCollection.findOne(query);
    //     res.send(result)
    // })

    //show all vehicles
    app.post('/allVehicles', async (req, res)=>{
        const newProduct = req.body;
        const result = await productCollection.insertOne(newProduct);
        res.send(result)
    })

    //book now 
    app.post('/bookNow', async (req, res)=>{
      const bookNow = req.body;
      const result = await bookNowCollection.insertOne(bookNow)
      res.send(result)
    })

    app.get('/allVehicles', async (req, res)=>{

        const email = req.query.email
        const query = {}
        if(email){
            query.email = email
        }

        const cursor = productCollection.find(query)
        const result = await cursor.toArray();
        res.send(result)
    })

    app.get('/allVehicles/:id', async (req, res)=>{
        const id = req.params.id;
        const query = { _id: new ObjectId(id)}
        const result = await productCollection.findOne(query);
        res.send(result)
    })

    app.put('/allVehicles/:id', async(req, res)=>{
        const id = req.params.id;
        const UpdatedData = req.body
        const query = { _id: new ObjectId(id)}
        const update = {
            $set: UpdatedData
        }
        const result = await productCollection.updateOne(query, update);
        res.send(result)
    })

    app.patch('/allVehicles/:id', async(req, res)=>{
        const id = req.params.id;
        const updateProduct = req.body;
        const query = { _id : new ObjectId(id)}
        const update={
            $set: {
                name: updateProduct.name,
                price: updateProduct.price
            }
        }
            const result = await productCollection.updateOne(query, update);
            res.send(result)

    })

    app.delete('/allVehicles/:id', async(req, res)=>{
        const id = req.params.id;
        const query = { _id: new ObjectId(id)}
        const result = await productCollection.deleteOne(query);
        res.send(result)
    })
    


    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`smart server running on port ${port}`)
})
