const express = require('express'),
      mysql = require('mysql');
const app = express(),
      conf = require('./conf.json'),
      db_con = mysql.createConnection({
          host: conf.db.host,
          user: conf.db.user,
          password: conf.db.pass,
          database: conf.db.database,
      });

db_con.connect(err => {
    if (err) throw err;
    console.log(`[MYSQL-DATABASE]:\tConnected as ${conf.db.user}@${conf.db.host}`);

    app.use('/', express.static('public/'));

    app.get('/api/get-task/:id', (req, res) => {
        db_con.query(`SELECT title, description, solution
                      FROM tasks
                      WHERE id = ?;`, [+req.params.id], (err, result, fields) => {
            if (err) res.status(500).send('Error 500: Internal server error!');
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(result));
        });
    });

    app.use('/', (req, res, next) => {
        res.redirect('/404.html');
    });

    app.listen(conf.port, () => console.log(`[WEB-SERVER]:\t\tListening on :${conf.port} ... `));
});