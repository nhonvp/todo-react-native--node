const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express();
const connectDb  = require('./controllers/db.js');
const TodoRouter = require('./routes/TodoRoutes.js');

connectDb();

app.use(morgan('combined'));
const port = 5000;
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

app.use('/api/todos',TodoRouter);

app.listen(port || 5000, () => {
    console.log(`Serve at http://192.168.1.5:${port}`);
});