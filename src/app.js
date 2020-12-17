require('dotenv').config(); //configurar as varieaveis ambientes
const express = require('express');
const cors = require('cors');
const examsController = require('./controllers/examsController')
const professorsController = require('./controllers/professorsController')

const app = express();

app.use(cors());
app.use(express.json());


app.post('/new-exam', examsController.postExam);

app.get('/list-professors', professorsController.getList);
app.get('/professor/:id', professorsController.getProfessorData);

module.exports = app;