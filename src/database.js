const mysql = require('mysql');

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'school'
});

dbConnection.connect(function (e) {
    if (e) {
        console.log('Error al conectar a base de datos. Verifique que exista y se pueda establecer una conexión hacia ella.');
        process.exit();
    } else {
        console.log('Base de datos conectada');
    }
});

module.exports = dbConnection;