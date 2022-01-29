const express = require('express');
const { Router } = express;

const app = express();
const products = Router();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use('/static', express.static(__dirname + 'public'));

const productsList = [];

app.get('/', (req, res) => {
   res.send('Desafio clase 8')
});

app.get('/products', (req, res) => {
   if(productsList.length === 0){
      res.send('aun no hay productos cargados')
   } else {res.send(productsList)}
   ;
});

app.get('/products/:id', (req, res) => {

   const getProductById = () => {
      const product = productsList.find(product => product.id == req.params.id);
      if (product === undefined){
         return 'No existe producto con esa ID';
      } else {
         return product;
      }
   };
            
   res.send(getProductById ());

});

app.post('/products', (req, res) => {
   const generateNewId = () =>{
      let idIndex = Math.floor(Math.random() * 9999) +1;
      if (Object.keys(productsList).includes(idIndex) == idIndex) {
          idIndex = generateNewId();
      };
      return idIndex;
  }
    const product = {
         id: generateNewId(),
         product: req.body.item,
         price: req.body.price
    };
    productsList.psuh(product);  
    res.send(productsList);
 });

products.put('/products/:id', (req, res) => {
    res.send('put ok');
 });

products.delete('/products/delete/:id', (req, res) => {

   productsList = productsList.filter(product => {
      product.id != req.params.id
   });
   
            
   res.send(productsList);

 });

app.use('/products', products);

app.listen(port, () => {
   console.log(`Escuchando en esta uri http://localhost: ${port}`)
});
