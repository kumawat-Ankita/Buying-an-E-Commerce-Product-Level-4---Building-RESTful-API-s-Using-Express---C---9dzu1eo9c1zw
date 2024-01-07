const fs = require('fs');
const express = require('express');
const app = express();


// Importing products from products.json file
const products = JSON.parse(
    fs.readFileSync(`${__dirname}/data/product.json`)
);


// Middlewares
app.use(express.json());

// Write PATCH endpoint to buy a product for the client here
// Endpoint /api/v1/products/:id

app.patch('/api/v1/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  
  // Find the product by ID
  const productIndex = products.findIndex(product => product.id === productId);
  
  // If product ID is not found
  if (productIndex === -1) {
    return res.status(404).json({ "status": "failed", "message": "Product not found!" });
  }

  // If product is found but out of stock
  if (products[productIndex].quantity === 0) {
    return res.status(404).json({ "status": "success", "message": `${products[productIndex].name}, Out of stock!` });
  }

  // Reduce the quantity by 1 as it's purchased
  products[productIndex].quantity--;

  // Prepare the response
  const updatedProduct = { ...products[productIndex] };

  // Return the updated product
  return res.status(200).json({
    "status": "success",
    "message": `Thank you for purchasing ${products[productIndex].name}`,
    "product": updatedProduct
  });
});


module.exports = app;
