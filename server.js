const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

//connecting to the database and checking for errors if any are present
const db = mysql.createPool({
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'b9414be449b6e1',
    password: '4a55747b',
    database: 'heroku_3adbd2446816101'
});

// db.connect(err => {
//     if (err) {
//         return err;
//     }
//     console.log("Connection Successful")
// })

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Ecommerce Products!");
});
app.get("/api/products", (req, res) => {
    
    db.query(`SELECT * FROM products`, 
    (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        };
    });
});

app.get("/api/products/asc", (req, res) => {

    db.query(`SELECT * FROM products ORDER BY price ASC`, 
    (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        };
    });
});

app.get("/api/products/desc", (req, res) => {

    db.query(`SELECT * FROM products ORDER BY price DESC`, 
    (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        };
    });
});

app.get("/api/products/equipments", (req, res) => {

    db.query(`SELECT * FROM products
    WHERE product_type = "Equipments"`, 
    (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        };
    });
});

app.get("/api/products/apparel", (req, res) => {

    db.query(`SELECT * FROM products
    WHERE product_type = "Apparel"`, 
    (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        };
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});