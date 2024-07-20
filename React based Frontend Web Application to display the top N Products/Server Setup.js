//Server Setup
//I'll set up a Node.js server using Express.js to test the Task 1 code.
//Server Code
//Here's the server code:

// server.js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/api/products', (req, res) => {
  const products = [
    { id: 1, name: 'Product 1', category: 'Electronics', company: 'Apple', rating: 4.5, price: 999.99, available: true },
    { id: 2, name: 'Product 2', category: 'Electronics', company: 'Samsung', rating: 4.2, price: 799.99, available: true },
    { id: 3, name: 'Product 3', category: 'Clothing', company: 'Nike', rating: 4.8, price: 49.99, available: false },
    { id: 4, name: 'Product 4', category: 'Home', company: 'IKEA', rating: 4.1, price: 29.99, available: true },
    { id: 5, name: 'Product 5', category: 'Electronics', company: 'Google', rating: 4.9, price: 1299.99, available: true },
  ];

  res.json(products);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
