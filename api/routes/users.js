const express = require('express');

const router = express.Router();

const success = 'success', failure = 'failure', tableName = 'user', whereClauseId = ' WHERE id = ? ';

const readJsonObj = {
    message: failure,
    users: []
}

const createJsonObj = {
    message: failure,
    rowsAffected: 0,
    insertId: 0
}

const updateJsonObj = {
    message: failure,
    rowsAffected: 0
}

const deleteJsonObj = {
    message: failure,
    rowsAffected: 0
}

router.get('/', (req, res, next) => {
    connection.query('SELECT * FROM ' + tableName, (error, results, fields) => {
        if (!error) {
            readJsonObj.message = success;
            readJsonObj.users = results;
        }
        res.json(readJsonObj);
    });
});

router.post('/create', (req, res, next) => {
    var dataInsert = {
        name: req.body.name,
        gender: req.body.gender,
        email: req.body.email
    };
    connection.query('INSERT INTO ' + tableName + ' set ? ', dataInsert, (error, rows) => {
        if (!error) {
            createJsonObj.message = success;
            createJsonObj.rowsAffected = rows.affectedRows;
            createJsonObj.insertId = rows.insertId;
        }
        res.json(createJsonObj);
    });
});

router.post('/edit', (req, res, next) => {
    var dataUpdate = {
        name: req.body.name,
        gender: req.body.gender,
        email: req.body.email
    };
    connection.query('UPDATE ' + tableName + ' set ? ' + whereClauseId, [dataUpdate, req.body.id], (error, rows) => {
        if (!error) {
            updateJsonObj.message = success;
            updateJsonObj.rowsAffected = rows.affectedRows;

        }
        res.json(updateJsonObj);
    });
});

router.post('/delete', (req, res, next) => {
    connection.query('DELETE FROM ' + tableName + whereClauseId, [req.body.id], (error, rows) => {
        if (!error) {
            deleteJsonObj.message = success;
            deleteJsonObj.rowsAffected = rows.affectedRows;

        }
        res.json(deleteJsonObj);
    });
});

module.exports = router;