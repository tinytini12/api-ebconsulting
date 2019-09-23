const express = require('express');
const router = express.Router();

const db = require('../database');
const limit = 10;

router.get('/test', (req, res) => {
    db.query('SELECT * from test limit ?', [limit], (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
});

module.exports = router;