const mysql = require('mysql');

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'school'
});

dbConnection.connect(function (e) {
    if (e) {
        console.log('Error al conectar a base de datos');
        return;
    } else {
        console.log('Base de datos conectada');
    }
});

module.exports = dbConnection;