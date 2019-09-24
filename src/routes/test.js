const express = require('express');
const router = express.Router();

const db = require('../database');
const limit = 10;

router.get('/test', (req, res) => {
    db.query('SELECT test.id_test, test.name, test.id_course, course.name as course  FROM test, course WHERE test.id_course = course.id_course ORDER BY test.id_test ASC limit ?', [limit], (error, rows) => {
        if (!error) {
            res.json(rows);
        } else {
            res.status(500).send({status: 'error', message: 'Error in API'});
        }
    });
});

router.get('/test/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(404).send({status: 'error', message: 'Invalid input'});
    } else {
        const {id} = req.params;
        db.query('SELECT test.id_test, test.name, test.id_course, course.name as course  FROM test, course WHERE test.id_course = course.id_course and test.id_test = ?', [id], (error, rows) => {
            if (!error) {
                res.json(rows);
            } else {
                res.status(500).send({status: 'error', message: 'Error in API'});
            }
        });
    }
});

router.post('/test', (req, res) => {
    if (Object.keys(req.body).length > 0 && req.body.name && req.body.name !== ''
        && req.body.id_course && req.body.id_course !== '' && !isNaN(req.body.id_course)) {
        const {name, id_course} = req.body;
        db.query('INSERT INTO test(name, id_course) values(?, ?)', [name, id_course], (error) => {
            if (!error) {
                res.json({status: 'ok', message: 'Test created'});
            } else {
                res.status(500).send({status: 'error', message: 'Error in insert'});
            }
        });
    } else {
        res.status(404).send({status: 'error', message: 'Invalid input'});
    }
});

router.delete('/test/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(404).send({status: 'error', message: 'Invalid input'});
    } else {
        const {id} = req.params;

        db.query('SELECT * FROM test WHERE id_test = ?', [id], (error, rows) => {
            if (!error) {
                if (rows.length === 0) {
                    res.status(404).send({status: 'error', message: 'Test not found'});
                } else {
                    db.query('DELETE FROM test WHERE id_test = ?', [id], (error) => {
                        if (!error) {
                            res.json({status: 'ok', message: 'Test deleted'});
                        } else {
                            res.status(500).send({status: 'error', message: 'Error in delete'});
                        }
                    });
                }
            } else {
                res.status(500).send({status: 'error', message: 'Error in delete'});
            }
        });
    }
});

router.put('/test', (req, res) => {
    if (Object.keys(req.body).length > 0 && req.body.id_test && req.body.id_test !== '' && !isNaN(req.body.id_test)
        && req.body.name && req.body.name !== '' && req.body.id_course && req.body.id_course !== '' && !isNaN(req.body.id_course)) {
        const {id_test, name, id_course} = req.body;

        db.query('SELECT * FROM test WHERE id_test = ?', [id_test], (error, rows) => {
            if (!error) {
                if (rows.length === 0) {
                    res.status(404).send({status: 'error', message: 'Test not found'});
                } else {
                    db.query('UPDATE test set name=?, id_course=? WHERE id_test=?', [name, id_course, id_test], (error) => {
                        if (!error) {
                            res.json({status: 'ok', message: 'Test updated'});
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