const { Client } = require('pg');

// Create a new client instance
const client = new Client({
    user: 'postgres',        // Your database username
    host: 'localhost',            // Your database host
    database: 'gtc',    // Your database name
    password: 'Lishanth',    // Your database password
    port: 5432,                   // Your database port (default PostgreSQL port is 5432)
});
client.connect(function(err, result) {
    console.log(err);
    console.log('Connection established');
})

module.exports = client;