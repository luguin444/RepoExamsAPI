const db = require('../database/index')
const {validatePostedExamSchema} = require('../schemas/newExamSchema');
const {getSubjectIdByItsName} = require('../repositories/subjectsRepo');
const {getProfessorIdByItsName, matchIdsSubjectAndProfessor} = require('../repositories/professorRepo');
const {insertNewExam} = require('../repositories/examsRepo');

async function postExam(req,res) {
    
    const isDataValid = validatePostedExamSchema(req.body);
    if(!isDataValid) return res.status(422).send({error: "Verique o formato dos dados enviados"});

    const idSubject = await getSubjectIdByItsName(req.body.subject);
    if(!idSubject) return res.status(500).send({error: "Erro ao encontrar a disciplina escolhida"});

    const idProfessor = await getProfessorIdByItsName(req.body.professor);
    if(!idProfessor) return res.status(500).send({error: "Erro ao encontrar o professor escolhido"});

    const thisProfessorTeachesThisSubject = await matchIdsSubjectAndProfessor(idSubject, idProfessor );
    if(!thisProfessorTeachesThisSubject) return res.status(500).send({error: "O professor escolhido não leciona a matéria escolhida"});

    const newExam = await insertNewExam(req.body, idSubject, idProfessor );
    if(!newExam) return res.status(500).send({error: "Erro ao adicionar a prova"});

    return res.status(201).send(newExam);
}


module.exports = {postExam}