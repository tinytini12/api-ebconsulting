const express = require('express');
const router = express.Router();

const db = require('../database');
const limit = 10;

router.get('/student', (req, res) => {
    db.query('SELECT * from student limit ?', [limit], (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
});

router.post('/student', (req, res) => {
    const {name, lastname} = req.body;
    db.query('INSERT INTO student(name, lastname) values(?, ?)', [name, lastname], (error, rows, fields) => {
        if (!error) {
            res.json({status: 'ok', message: 'Student created'});
        } else {
            console.log(error);
        }
    });
});

router.delete('/student/:id', (req, res) => {
    const {id} = req.params;
    db.query('DELETE FROM student WHERE id_student = ?', [id], (error, rows, fields) => {
        if (!error) {
            res.json({status: 'ok', message: 'Student deleted'});
        } else {
            console.log(error);
        }
    });
});

module.exports = router;