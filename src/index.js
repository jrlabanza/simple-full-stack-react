const express = require('express');
const cors = require('cors');
const uuid = require('uuid');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM sample_table';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reactdb'
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

app.get('/products/add', (req, res) =>{
  const { handlerID, testerID, description, remarks } = req.query;
  const INSERT_PRODUCTS_QUERY = `INSERT INTO sample_table(id, handlerID, testerID, description, remarks) VALUE ('${uuid()}', ${handlerID}, '${testerID}', '${description}', '${remarks}')`;
  connection.query(INSERT_PRODUCTS_QUERY, (err, results) =>{
    if(err) {
      return res.send(err)
    }
    else{
      return res.send('successfully added product')
    }
  });
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
