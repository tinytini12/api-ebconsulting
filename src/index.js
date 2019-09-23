const express = require('express');
const app = express();

// Configuración
app.set('port', 3000);
app.use(express.json());

// Rutas
app.use(require('./routes/course_student'));
app.use(require('./routes/course'));
app.use(require('./routes/student_test'));
app.use(require('./routes/student'));
app.use(require('./routes/teacher'));
app.use(require('./routes/test.js'));

app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
});