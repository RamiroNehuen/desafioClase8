const express = require('express');
const { Router } = express;

const app = express();
const products = Router();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

const productsList = [];


products.get('/', (req, res) => {
   if(productsList.length === 0){
      res.send(` Aún no hay productos cargados`)
   } else {res.send(productsList)}
   ;
});

products.get('/:id', (req, res) => {
   const { id } = req.params;
   const found = productsList.find(product => product.id === id);

   if(found){
      res.send(found);
   }else {
      res.send('El producto no existe');
   };
});

products.post('/', (req, res) => {
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
    productsList.push(product);  
    res.send(productsList);
 });

products.put('/:id', (req, res) => {
    res.send('put ok');
 });

products.delete('/:id', (req, res) => {

  const { id } = req.params;
  const deleted = productsList.find(product => product.id === id);
  if(deleted){
     productsList = productsList.filter(product => product.id === id);
     res.send(`Se ha eliminado correctamente el siguiente producto: ${deleted}`)
  } else {
     res.send('El id ingresado no coincide con ningún producto');
  };
 });

app.use('/products', products);
app.use('/static', express.static('public'));

app.listen(port, () => {
   console.log(`Escuchando en esta uri http://localhost: ${port}`)
});
