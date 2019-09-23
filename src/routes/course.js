const express = require('express');
const router = express.Router();

const db = require('../database');
const limit = 10;

router.get('/course', (req, res) => {
    db.query('SELECT * from student limit ?', [limit], (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
});

module.exports = router;