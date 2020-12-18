const db = require('../database/index')

const {getListAllSubjects, insertQuantitiesOfExamsInObject} = require('../repositories/subjectsRepo');
// const {} = require('../repositories/subjectsRepo');
// const {insertNewExam} = require('../repositories/examsRepo');

async function getList(req,res) {
    
    const subjects = await getListAllSubjects();

    const subjectsAndNumberExams = await insertQuantitiesOfExamsInObject(subjects);

    return res.status(200).send(subjectsAndNumberExams);
}

async function getSubjectData(req,res) {

    const {id} = req.params;

    const professor = await getProfessorById(id);
    if(!professor) return res.status(500).send({error: "Professor não foi encontrado"});

    const professorAndExams = await insertExamsFromProfessor(professor);
    if(!professor) return res.status(500).send({error: "Ocorreu um problema ao buscar as provas do professor"});

    res.status(200).send(professorAndExams);
}

module.exports = {getList, getSubjectData}