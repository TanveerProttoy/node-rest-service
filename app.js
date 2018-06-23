const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRoutes = require('./api/routes/users');

app.use((req, res, next) => {
    global.connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'node_rest_service_db'
    });
    connection.connect();
    next();
});

app.use('/users', userRoutes);

module.exports = app;