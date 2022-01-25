const express = require('express');
const { Router } = express;

const app = express();
const products = Router();

app.use(express.json())
app.use(express.urlencoded({extend:true}));
app.use('/static', express.static('public'));

const productsList = [];

products.get('/products', (req, res) => {
   res.send(productsList);
});

products.get('/products/:id', (req, res) => {
   res.send('post ok');
});

products.post('/products', (req, res) => {
    const product = {
        product: req.body.item,
        price: req.body.price
    };
    productsList.psuh(product);  
    res.send('post ok');
 });

products.put('/products/:id', (req, res) => {
    res.send('post ok');
 });

products.delete('/products', (req, res) => {
    res.send('post ok');
 });

app.use('/products', products);

app.listen(8080);
