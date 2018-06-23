const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const { Client } = require('pg');
const dbClient = new Client({
    user: "schenker",
    password: "vreni1980",
    host: "192.168.99.100",
    port: 5432,
    database: "trees_application"
})

dbClient.connect().then(() => {
    console.log('connected to the database');
}).catch(error => {
    console.log('an error occured', error);
})



app.listen(3000, () => {
    console.log('listening at port 3000');
})

app.get('/', (req, res) => {
    res.status(200).send('database sample application');
});

app.get('/api/treesapp', async (req, res) => {
    const sql = "select * from treestable";
    const result = await dbClient.query(sql);
    res.status(200).send(result.rows);
})
app.get('/api/treesapp/:id', async (req, res) => {
    const treeid = req.params.id;
    const sql = 'select * from treestable WHERE treeid=' + treeid;
    const result = await dbClient.query(sql);
    if (result.rows.length == 0) {
        res.sendStatus(404);
    } else {
        res.status(200).send(result.rows[0]);
    }
})

app.post('/api/treesapp', async (req, res) => {
    const body = req.body;
    const sql = " insert into treestable(name,family,flowercolor) values($1,$2,$3)";
    const values = [
        body.name,
        body.family,
        body.flowercolor
    ];
    try {
        await dbClient.query(sql, values);
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error);
    }
})