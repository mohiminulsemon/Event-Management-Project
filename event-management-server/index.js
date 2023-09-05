const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
// const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);


// middleware
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

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
    // await client.connect();

    const usersCollection = client.db("eventManagement").collection("users");
    const productsCollection = client.db("eventManagement").collection("products");
    const bookingsCollection = client.db("eventManagement").collection("bookings");
    const paymentCollection = client.db("eventManagement").collection("payments");

    //<<<<<<<<<-------------------------users----------------------------------->>>>>>>>

    // get all user
    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    // Get user by email
    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await usersCollection.findOne(query);
      console.log(result);
      res.send(result);
    });

    // role updates for users
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

    // create a new user

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

    //<<<<<<-----------------------products------------------------------->>>>>>>>>>>>>>

    // adding a new product
    app.post("/products", async (req, res) => {
      try {
        const productData = req.body;

        const result = await productsCollection.insertOne(productData);

        res.status(201).json({ message: "Product created successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    });

    // get all products
    app.get("/products", async (req, res) => {
      try {
        const products = await productsCollection.find().toArray();
        res.send(products);
      } catch (error) {
        console.error("Error retrieving products:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // GET  products by email
    app.get("/products/organizer", async (req, res) => {
      try {
        const { email } = req.query;

        console.log("Server Email: ", email);
        const products = await productsCollection
          .find({ email: email })
          .toArray();
        res.json(products);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    //  update the products status
    app.patch("/products/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const { status } = req.body;

        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ error: "Invalid products ID" });
        }

        const updatedProducts = await productsCollection.findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: { status } },
          { returnOriginal: false }
        );

        if (!updatedProducts.value) {
          return res.status(404).json({ error: "products not found" });
        }

        res.json(updatedProducts.value);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // GET feedback for a specific products
    app.get("/products/:id/feedback", async (req, res) => {
      try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ error: "Invalid products ID" });
        }

        const productsData = await productsCollection.findOne({
          _id: new ObjectId(id),
        });

        if (!productsData) {
          return res.status(404).json({ error: "products not found" });
        }

        const feedback = productsData.feedback || "No feedback available";
        res.json({ feedback });
      } catch (error) {
        console.error("Error retrieving products feedback:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // update the products feedback
    app.post("/products/:id/feedback", async (req, res) => {
      try {
        const { id } = req.params;
        const { feedback } = req.body;
        console.log(feedback);

        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ error: "Invalid products ID" });
        }

        const updatedProducts = await productsCollection.findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: { feedback } },
          { returnOriginal: false }
        );

        if (!updatedProducts.value) {
          return res.status(404).json({ error: "products not found" });
        }

        res.json(updatedProducts.value);
      } catch (error) {
        console.error("Error handling feedback:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // <<<<<<<<<<<<------------------Booking Products--------------------->>>>>>>>>>>>>>>>

    // Create a new booking product
    app.post("/selectedProducts", async (req, res) => {
      try {
        const productData = req.body; 
  
        const result = await bookingsCollection.insertOne(productData);

        res.send(productData);
      } catch (error) {
        console.error("Error creating Product:", error);
        res.status(500).json({ error: "Server error" });
      }
    });

    // get booking products by user mail

    app.get("/selectedProducts/:email", async (req, res) => {
      try {
        const email = req.params.email;
        const query = { bookingEmail: email };

        const selectedProducts = await bookingsCollection.find(query).toArray();

        res.status(200).json(selectedProducts);
      } catch (error) {
        console.error("Error fetching selected products:", error);
        res.status(500).json({ error: "Server error" });
      }
    });

    // delete selected products

    app.delete("/selectedProducts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      try {
        const result = await bookingsCollection.deleteOne(query);
        res.json({ message: "Product deleted successfully", result });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    });

 // <<<<<<<<<<<<------------------payments--------------------->>>>>>>>>>>>>>>>


    // // create payment intent
    // app.post("/create-payment-intent", async (req, res) => {
    //   const { price } = req.body;
    //   const amount = parseInt(price * 100);
    //   const paymentIntent = await stripe.paymentIntents.create({
    //     amount: amount,
    //     currency: "usd",
    //     payment_method_types: ["card"],
    //   });

    //   res.send({
    //     clientSecret: paymentIntent.client_secret,
    //   });
    // });

    // payment related api

    app.post("/payments", async (req, res) => {
      const payment = req.body;
      const insertResult = await paymentCollection.insertOne(payment);

      const query = {
        _id: { $in: payment.cartItems.map((id) => new ObjectId(id)) },
      };
      const deleteResult = await bookingsCollection.deleteMany(query);

      res.send({ insertResult, deleteResult });
    });




  
    // Send a ping to confirm a successful connection

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
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
