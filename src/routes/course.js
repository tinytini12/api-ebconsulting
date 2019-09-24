const express = require('express');
const router = express.Router();

const db = require('../database');
const limit = 10;

router.get('/course', (req, res) => {
    db.query('SELECT * FROM course ORDER BY id_course ASC limit ?', [limit], (error, rows) => {
        if (!error) {
            res.json(rows);
        } else {
            res.status(500).send({status: 'error', message: 'Error in API'});
        }
    });
});

router.post('/course', (req, res) => {
    if (Object.keys(req.body).length > 0 && req.body.name && req.body.name !== '' && req.body.id_teacher && req.body.id_teacher !== '' && !isNaN(req.body.id_teacher)) {
        const {name, id_teacher} = req.body;
        db.query('INSERT INTO course(name, id_teacher) values(?, ?)', [name, id_teacher], (error) => {
            if (!error) {
                res.json({status: 'ok', message: 'Course created'});
            } else {
                res.status(500).send({status: 'error', message: 'Error in insert'});
            }
        });
    } else {
        res.status(404).send({status: 'error', message: 'Invalid input'});
    }
});

router.delete('/course/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(404).send({status: 'error', message: 'Invalid input'});
    } else {
        const {id} = req.params;

        db.query('SELECT * FROM course WHERE id_course = ?', [id], (error, rows) => {
            if (!error) {
                if (rows.length === 0) {
                    res.status(404).send({status: 'error', message: 'Course not found'});
                } else {
                    db.query('DELETE FROM course WHERE id_course = ?', [id], (error) => {
                        if (!error) {
                            res.json({status: 'ok', message: 'Course deleted'});
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

router.put('/course', (req, res) => {
    if (Object.keys(req.body).length > 0 && req.body.id_course && req.body.id_course !== '' && !isNaN(req.body.id_course)
        && req.body.name && req.body.name !== '' && req.body.id_teacher && req.body.id_teacher !== '' && !isNaN(req.body.id_teacher)) {
        const {id_course, name, id_teacher} = req.body;

        db.query('SELECT * FROM course WHERE id_course= ?', [id_course], (error, rows) => {
            if (!error) {
                if (rows.length === 0) {
                    res.status(404).send({status: 'error', message: 'Course not found'});
                } else {
                    db.query('UPDATE course set name=?, id_teacher=? WHERE id_course=?', [name, id_teacher, id_course], (error) => {
                        if (!error) {
                            res.json({status: 'ok', message: 'Course updated'});
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