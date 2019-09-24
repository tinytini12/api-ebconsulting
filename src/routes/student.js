const express = require('express');
const router = express.Router();

const db = require('../database');
const limit = 10;

router.get('/student', (req, res) => {
    db.query('SELECT * FROM student ORDER BY id_student ASC limit ?', [limit], (error, rows) => {
        if (!error) {
            res.json(rows);
        } else {
            res.status(500).send({status: 'error', message: 'Error in API'});
        }
    });
});

router.get('/student/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(404).send({status: 'error', message: 'Invalid input'});
    } else {
        const {id} = req.params;
        db.query('SELECT * FROM student WHERE id_student = ?', [id], (error, rows) => {
            if (!error) {
                res.json(rows);
            } else {
                res.status(500).send({status: 'error', message: 'Error in API'});
            }
        });
    }
});

router.post('/student', (req, res) => {
    if (Object.keys(req.body).length > 0 && req.body.name && req.body.name !== '' && req.body.lastname && req.body.lastname !== '') {
        const {name, lastname} = req.body;
        db.query('INSERT INTO student(name, lastname) values(?, ?)', [name, lastname], (error) => {
            if (!error) {
                res.json({status: 'ok', message: 'Student created'});
            } else {
                res.status(500).send({status: 'error', message: 'Error in insert'});
            }
        });
    } else {
        res.status(404).send({status: 'error', message: 'Invalid input'});
    }
});

router.delete('/student/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(404).send({status: 'error', message: 'Invalid input'});
    } else {
        const {id} = req.params;

        db.query('SELECT * FROM student WHERE id_student = ?', [id], (error, rows) => {
            if (!error) {
                if (rows.length === 0) {
                    res.status(404).send({status: 'error', message: 'Student not found'});
                } else {
                    db.query('DELETE FROM student WHERE id_student = ?', [id], (error) => {
                        if (!error) {
                            res.json({status: 'ok', message: 'Student deleted'});
                        } else {
                            if (error.errno === 1451) {
                                res.status(400).send({status: 'error', message: 'Student has tests or courses'});
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

router.put('/student', (req, res) => {
    if (Object.keys(req.body).length > 0 && req.body.id_student && !isNaN(req.body.id_student)
        && req.body.name && req.body.name !== '' && req.body.lastname && req.body.lastname !== '') {
        const {id_student, name, lastname} = req.body;

        db.query('SELECT * FROM student WHERE id_student = ?', [id_student], (error, rows) => {
            if (!error) {
                if (rows.length === 0) {
                    res.status(404).send({status: 'error', message: 'Student not found'});
                } else {
                    db.query('UPDATE student set name=?, lastname=? WHERE id_student=?', [name, lastname, id_student], (error) => {
                        if (!error) {
                            res.json({status: 'ok', message: 'Student updated'});
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