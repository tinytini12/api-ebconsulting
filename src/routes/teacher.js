const express = require('express');
const router = express.Router();

const db = require('../database');
const limit = 10;

router.get('/teacher', (req, res) => {
    db.query('SELECT * FROM teacher ORDER BY id_teacher ASC limit ?', [limit], (error, rows) => {
        if (!error) {
            res.json(rows);
        } else {
            res.status(500).send({status: 'error', message: 'Error in API'});
        }
    });
});

router.get('/teacher/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(404).send({status: 'error', message: 'Invalid input'});
    } else {
        const {id} = req.params;
        db.query('SELECT * FROM teacher WHERE id_teacher = ?', [id], (error, rows) => {
            if (!error) {
                res.json(rows);
            } else {
                res.status(500).send({status: 'error', message: 'Error in API'});
            }
        });
    }
});

router.post('/teacher', (req, res) => {
    if (Object.keys(req.body).length > 0 && req.body.name && req.body.name !== '' && req.body.lastname && req.body.lastname !== '') {
        const {name, lastname} = req.body;
        db.query('INSERT INTO teacher(name, lastname) values(?, ?)', [name, lastname], (error) => {
            if (!error) {
                res.json({status: 'ok', message: 'Teacher created'});
            } else {
                res.status(500).send({status: 'error', message: 'Error in insert'});
            }
        });
    } else {
        res.status(404).send({status: 'error', message: 'Invalid input'});
    }
});

router.delete('/teacher/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(404).send({status: 'error', message: 'Invalid input'});
    } else {
        const {id} = req.params;

        db.query('SELECT * FROM teacher WHERE id_teacher = ?', [id], (error, rows) => {
            if (!error) {
                if (rows.length === 0) {
                    res.status(404).send({status: 'error', message: 'Teacher not found'});
                } else {
                    db.query('DELETE FROM teacher WHERE id_teacher = ?', [id], (error) => {
                        if (!error) {
                            res.json({status: 'ok', message: 'Teacher deleted'});
                        } else {
                            if (error.errno === 1451) {
                                res.status(400).send({status: 'error', message: 'Professor has courses'});
                            } else {
                                res.status(500).send({status: 'error', message: 'Error in delete'});
                            }
                        }
                    });
                }
            } else {
                res.status(500).send({status: 'error', message: 'Error in delete'});
            }
        });
    }
});

router.put('/teacher', (req, res) => {
    if (Object.keys(req.body).length > 0 && req.body.id_teacher && !isNaN(req.body.id_teacher)
        && req.body.name && req.body.name !== '' && req.body.lastname && req.body.lastname !== '') {
        const {id_teacher, name, lastname} = req.body;

        db.query('SELECT * FROM teacher WHERE id_teacher = ?', [id_teacher], (error, rows) => {
            if (!error) {
                if (rows.length === 0) {
                    res.status(404).send({status: 'error', message: 'Teacher not found'});
                } else {
                    db.query('UPDATE teacher set name=?, lastname=? WHERE id_teacher=?', [name, lastname, id_teacher], (error) => {
                        if (!error) {
                            res.json({status: 'ok', message: 'Teacher updated'});
                        } else {
                            res.status(500).send({status: 'error', message: 'Error in put'});
                        }
                    });
                }
            } else {
                res.status(500).send({status: 'error', message: 'Error in put'});
            }
        });
    } else {
        res.status(404).send({status: 'error', message: 'Invalid input'});
    }
});

module.exports = router;