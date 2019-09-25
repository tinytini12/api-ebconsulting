const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const db = require('./database');
const mocker = require('mocker-data-generator').default;

createDataInDB();

// Configuración
app.set('port', port);
app.use(express.json());
app.use(cors());

// Rutas
app.use(require('./routes/course'));
app.use(require('./routes/student'));
app.use(require('./routes/teacher'));
app.use(require('./routes/test'));

app.listen(app.get('port'), () => {
    console.log('Servidor conectado en puerto: ' + port);
});

function createDataInDB() {
    db.query(`
    SELECT COUNT(*) as result FROM student
    UNION SELECT COUNT(*) FROM course
    UNION ALL SELECT COUNT(*) FROM teacher
    UNION ALL SELECT COUNT(*) FROM test`, (error, rows) => {
        if (rows[0].result === 0 && rows[1].result === 0 && rows[2].result === 0) {
            console.log('Base de datos no tiene registros, llenando...');

            const teacher = {
                id_teacher: {incrementalId: 1},
                name: {faker: 'name.firstName'},
                lastname: {faker: 'name.lastName'}
            };
            const student = {
                id_student: {incrementalId: 1},
                name: {faker: 'name.firstName'},
                lastname: {faker: 'name.lastName'}
            };
            const course = {
                id_course: {incrementalId: 1},
                name: {values: ['Angular 4', 'AWS Essentials', 'Scrum', 'Kanban', 'Google Cloud']},
                id_teacher: {faker: 'random.number({"min": 1, "max": 5})'}
            };
            const test = {
                id_test: {incrementalId: 1},
                name: {values: ['Introducción', 'Práctica', 'Metodología', 'Ejercicios', 'Final']},
                id_course: {faker: 'random.number({"min": 1, "max": 5})'}
            }
            const course_student = {
                id_course: {values: [1, 2, 3, 4, 5]},
                id_student: {faker: 'random.number({"min": 1, "max": 5})'},
                inscription_date: {faker: 'date.recent'}
            }
            const student_test = {
                id_student: {incrementalId: 1},
                id_test: {values: [1, 2, 3, 4, 5]},
                score: {faker: 'random.number({"min": 1, "max": 7})'}
            }
            mocker()
                .schema('teacher', teacher, 5)
                .schema('student', student, 5)
                .schema('course', course, {uniqueField: 'name'})
                .schema('test', test, {uniqueField: 'name'})
                .schema('course_student', course_student, {uniqueField: 'id_course'})
                .schema('student_test', student_test, {uniqueField: 'id_test'}).build().then(data => {
                    let queries = '';
                    let fields = '';
                    let values = [];
                    for (let obj of Object.keys(data)) {
                        fields = Object.keys(data[obj][0]);
                        queries = 'INSERT INTO ' + obj + '(' + fields[0] + ',' + fields[1] + ',' + fields[2] + ') VALUES ?';

                        for (let row of data[obj]) {
                            values.push([row[fields[0]], row[fields[1]], row[fields[2]]])
                        }

                        saveData(queries, values);
                        values = [];
                    }
                    console.log('Se ha llenado base de datos exitosamente');
                });
        } else {
            console.log('Base de datos ya contiene registros');
        }
    });
}

async function saveData(queries, values) {
    await db.query(queries, [values], function (err) {
        if (err) throw err;
    });
}