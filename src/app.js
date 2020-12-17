require('dotenv').config(); //configurar as varieaveis ambientes
const express = require('express');
const cors = require('cors');
const examsController = require('./controllers/examsController')

const app = express();

app.use(cors());
app.use(express.json());

app.post('/new-exam', examsController.postExam);

module.exports = app;