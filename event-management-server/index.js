const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res
      .status(401)
      .send({ error: true, message: "unauthorized access" });
  }
  // bearer token
  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ error: true, message: "unauthorized access" });
    }
    req.decoded = decoded;
    next();
  });
};

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.02w34e6.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    const usersCollection = client.db("eventManagement").collection("users");
    const productsCollection = client
      .db("eventManagement")
      .collection("products");

    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });

      res.send({ token });
    });

    // user collection
    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });
    // Get user
    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await usersCollection.findOne(query);
      console.log(result);
      res.send(result);
    });

    // Define the route to handle role updates for users
    app.patch("/users/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const { role } = req.body;

        // Validate the role to prevent unauthorized role changes (optional)
        const validRoles = ["user", "organizer", "admin"];
        if (!validRoles.includes(role)) {
          return res.status(400).json({ error: "Invalid role" });
        }

        // Assuming usersCollection is a valid MongoDB collection reference
        const updatedUser = await usersCollection.findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: { role } },
          { returnOriginal: false } // Return the updated document
        );

        if (!updatedUser.value) {
          return res.status(404).json({ error: "User not found" });
        }

        res.json(updatedUser.value);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      // console.log('User: ', user);

      const query = { email: user.email };
      const existingUser = await usersCollection.findOne(query);
      console.log("Existing user: ", existingUser);
      // google login
      if (existingUser) {
        return res.send({ message: "user already exists" });
      }

      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    //products


    // API endpoint for adding a new product
    app.post("/products", async (req, res) => {
      try {
        const productData = req.body;

        // // Set the status field to 'pending'
        // productData.status = 'pending';

        // Insert the product into the products collection
        const result = await productsCollection.insertOne(productData);

        res.status(201).json({ message: "Product created successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    });
    // Product collection


        // GET endpoint for retrieving products
        app.get('/products', async (req, res) => {
            try {
                const products = await productsCollection.find().toArray();
                res.send(products);
            }
            catch (error) {
                console.error('Error retrieving products:', error)
                res.status(500).json({ error: 'Internal server error' });
            }
        })


        // GET endpoint for retrieving user products by email
        app.get('/products/organizer', async (req, res) => {
            try {
                // console.log(req.body);
                // console.log(req.query);
                const { email } = req.query;
                // const email = req.query.email;


                console.log("Server Email: ", email);
                const products = await productsCollection.find({ email: email }).toArray();
                res.json(products);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        })

        // Implement the endpoint to update the products status
        // PATCH endpoint to update the products status
        app.patch('/products/:id', async (req, res) => {
            try {
                const { id } = req.params;
                const { status } = req.body;


                if (!ObjectId.isValid(id)) {
                    return res.status(400).json({ error: 'Invalid products ID' });
                }


                const updatedProducts = await productsCollection.findOneAndUpdate(
                    { _id: new ObjectId(id) },
                    { $set: { status } },
                    { returnOriginal: false }
                );


                if (!updatedProducts.value) {
                    return res.status(404).json({ error: 'products not found' });
                }


                res.json(updatedProducts.value);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });




        // GET endpoint for retrieving feedback for a specific products
        app.get('/products/:id/feedback', async (req, res) => {
            try {
                const { id } = req.params;


                if (!ObjectId.isValid(id)) {
                    return res.status(400).json({ error: 'Invalid products ID' });
                }


                const productsData = await productsCollection.findOne({ _id: new ObjectId(id) });


                if (!productsData) {
                    return res.status(404).json({ error: 'products not found' });
                }


                const feedback = productsData.feedback || 'No feedback available';
                res.json({ feedback });
            } catch (error) {
                console.error('Error retrieving products feedback:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });




        // POST endpoint to update the products feedback
        app.post('/products/:id/feedback', async (req, res) => {
            try {
                const { id } = req.params;
                const { feedback } = req.body;
                console.log(feedback);


                if (!ObjectId.isValid(id)) {
                    return res.status(400).json({ error: 'Invalid products ID' });
                }


                const updatedProducts = await productsCollection.findOneAndUpdate(
                    { _id: new ObjectId(id) },
                    { $set: { feedback } },
                    { returnOriginal: false }
                );


                if (!updatedProducts.value) {
                    return res.status(404).json({ error: 'products not found' });
                }


                res.json(updatedProducts.value);
            } catch (error) {
                console.error('Error handling feedback:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("event managemt");
});

app.listen(port, () => {
  console.log(`event server is playing on port ${port}`);
});
