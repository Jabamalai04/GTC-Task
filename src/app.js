const client = require("./db/connection");
const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
const app = express();

const viewPath = path.join(__dirname, '../templates/views');

const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'hbs');
app.set('views', viewPath);

//api's to store in database:

app.get('/api/test', function(req, res) {
  console.log("req.query=", req.query.firstName);
  let firstName = req.query.firstName;
  let sql = `
    SELECT 
      * 
    FROM 
      users
    WHERE
      first_name = $1
  `;

  let values = [firstName];
  client.query(sql, values, function(err, result) {
    res.send(result.rows);
  })
})
app.post('/api/users', function(req, res) {
  let firstName = req.body.first_name;
  let lastName = req.body.last_name;
  let emailId = req.body.email_id;
  let password = req.body.password;
  
  // console.log("Req.Body=", req.body);
  let sql = `
    INSERT INTO users(
      first_name, 
      last_name, 
      email_id, 
      password
    )
    VALUES(
      $1, 
      $2, 
      $3, 
      $4
    )
  `;
  let values = [firstName, lastName, emailId, password];

  client.query(sql, values, function(err, result) {
    if (err) {
      res.status(500).send("Unable to save");
      return;
    }
    res.status(201).send("Users Saved successfully");
    
  })
})

app.post('/api/vendors', function(req, res) {
  console.log("Req.body=", req.body);
  let companyName = req.body.company_name;
  let emailId = req.body.email_id;
  let web = req.body.website;
  let sql = `
    INSERT INTO vendors(
      company_name, 
      email_id, 
      website
    )
    VALUES(
      $1, 
      $2, 
      $3
    )
  `;

  let values = [companyName, emailId, web];
  client.query(sql, values, function(err, result) {
    if (err) {
      res.status(500).send({
        msg: "Unable to save record",
        error: err 
      });
      return;
    }
    res.status(201).send("Vendor record saved successfully");
  })
})

//Rendering pages:
app.get('/home', function (req, res) {
  res.render('home');
})

app.get('/users/add', function (req, res) {
  res.render('add_users');
})

app.get('/users', function (req, res) {
  console.log("req.query=", req.query);
  let searchTxt = req.query.searchTxt;

  let sql = `
    SELECT 
      * 
    FROM 
      users
    WHERE
      first_name = $1
  `;
  let values = [searchTxt];
  client.query(sql, values, function(err, users) {
    console.log("users=", users.rows);
    res.render('users', {
      title: "USERS",
      users: users.rows
    });
  })
  
})

app.get('/reg', function (req, res) {
  res.render('reg');
})

app.get('/admin/add', function (req, res) {
  res.render('add_admin');
})

app.get('/admin', function (req, res) {
  let sql = `
    SELECT
      *
    FROM
      admin
  `;
  client.query(sql, function(err, admins) {
    // console.log("error=", err);
    // console.log("Admin=", admins);
    res.render('admin', {
      title: "ADMIN",
      admins: admins.rows
    });
  })
 
})

app.get('/products/add', function (req, res) {
  res.render('add_products');
})

app.get('/products', function (req, res) {
  res.render('products');
})

app.get('/vendors/add', function (req, res) {
  res.render('add_vendors');
})

app.get('/vendors', function (req, res) {
  let sql = `
    SELECT 
      * 
    FROM 
      vendors
  `;
  client.query(sql, function(err, vendors) {
    res.render('vendors', {
      title: "VENDORS",
      vendors: vendors.rows
    });
  })
})

app.get('/', function(req, res) {
  res.render('login');
})

app.listen(8000, function() {
    console.log("Server is upon port number 8000");
});