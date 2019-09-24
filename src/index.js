const express = require('express');
const app = express();
const cors = require('cors');

// Configuración
app.set('port', 3000);
app.use(express.json());
app.use(cors());

// Rutas
app.use(require('./routes/course'));
app.use(require('./routes/student'));
app.use(require('./routes/teacher'));
app.use(require('./routes/test.js'));

app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
});