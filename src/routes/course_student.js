const express = require('express');
const router = express.Router();

const db = require('../database');
const limit = 10;

router.get('/course_student', (req, res) => {
    db.query('SELECT * from course_student limit ?', [limit], (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
});

module.exports = router;