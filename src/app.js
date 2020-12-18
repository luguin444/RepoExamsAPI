require('dotenv').config(); //configurar as varieaveis ambientes
const express = require('express');
const cors = require('cors');
const examsController = require('./controllers/examsController')
const professorsController = require('./controllers/professorsController')
const subjectsController = require('./controllers/subjectsController')

const app = express();

app.use(cors());
app.use(express.json());


app.post('/new-exam', examsController.postExam);

app.get('/list-professors', professorsController.getList);
app.get('/professor/:id', professorsController.getProfessorData);

app.get('/list-subjects', subjectsController.getList);
app.get('/subject/:id', subjectsController.getSubjectData);

module.exports = app;