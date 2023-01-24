const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connect } = require('mongoose');
const Product = require('./Models/product');

dotenv.config();
connect(
  process.env.DB_CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Database connection established');
    }
  }
);

const app = express();

app.use(express.json());
app.use(cors());

//Create product
app.post('/products', async (req, res) => {
  const product = req.body;

  try {
    const productEntity = new Product({
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity
    });

    await productEntity.save();
    res.json(productEntity);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// Display all products
app.get('/products', async (req,res)=> {

  const products = await Product.find();
  res.json(products);

});

app.listen(process.env.PORT, () => {
  console.log('listening on port 8000');
});
