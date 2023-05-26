const express = require("express");
const { join } = require("path");
const app = express();
const { auth } = require("express-oauth2-jwt-bearer");
const mongo = require("mongodb");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");
var fs = require('fs');
const mongoose = require('mongoose')

// Serve static assets from the /public folder
app.use(express.static(join(__dirname, "public")));

// Endpoint to serve the configuration file
app.get("/auth_config.json", (req, res) => {
  res.sendFile(join(__dirname, "auth_config.json"));
});

// Serve the index page for all other requests
app.get("/*", (_, res) => {
  res.sendFile(join(__dirname, "index.html"));
});


// Listen on port 3000
app.listen(3000, () => console.log("Application running on port 3000"));


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://karanp45:Kp2992002@project.viinysi.mongodb.net/user";


mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("DB CONNECTED")
}).catch((error) => {
  console.log("UNABLE to connect to DB", error)
})



app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));

const userRoutes = require('./routes/User');
const { connect } = require("http2");

app.use('/api', userRoutes)


const URI = "mongodb+srv://karanp45:Kp2992002@project.viinysi.mongodb.net/";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);
