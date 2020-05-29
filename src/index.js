const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM osr';

const connection = mysql.createConnection({
  host: 'phsm01ws012',
  user: 'fthrdr',
  password: 'fthrdr01',
  database: 'ftdr'
});

connection.connect(err =>{
  if(err){
    return err;
  }
});

app.use(cors());

app.get('/', (req, res) => {
  res.send('go to /products to see products');
});

app.get('/products', (req, res) =>{
  connection.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
    if(err){
      return res.send(err);
    }
    else{
      return res.json({
        data: results
      })
    }
  })
});

app.listen(3000, () => {
  console.log('Products server listening on port 3000');
});
