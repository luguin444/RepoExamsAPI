const db = require('../database/index')

const {getListAllSubjects, insertQuantitiesOfExamsInObject, getSubjectById, insertExamsFromSubject} = require('../repositories/subjectsRepo');
// const {} = require('../repositories/subjectsRepo');
// const {insertNewExam} = require('../repositories/examsRepo');

async function getList(req,res) {
    
    const subjects = await getListAllSubjects();

    const subjectsAndNumberExams = await insertQuantitiesOfExamsInObject(subjects);

    return res.status(200).send(subjectsAndNumberExams);
}

async function getSubjectData(req,res) {

    const {id} = req.params;

    const subject = await getSubjectById(id);
    if(!subject) return res.status(500).send({error: "Disciplina não foi encontrada"});

    const subjectsAndExams = await insertExamsFromSubject(subject);
    if(!subjectsAndExams) return res.status(500).send({error: "Ocorreu um problema ao buscar as provas da disciplina"});

    res.status(200).send(subjectsAndExams);
}

module.exports = {getList, getSubjectData}