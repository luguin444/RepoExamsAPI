const db = require('../database/index')

const {getListAllProfessors, 
    insertQuantitiesOfExamsInObject,
    getProfessorById,
    insertExamsFromProfessor,
    getProfessorsBySubjectIdFromDatabase} = require('../repositories/professorRepo');

async function getList(req,res) {
    
    const professors = await getListAllProfessors();

    const professorAndNumberExams = await insertQuantitiesOfExamsInObject(professors);

    return res.status(200).send(professorAndNumberExams);
}

async function getProfessorsBySubjectId(req,res) {
    
    const { idSubject } = req.params;

    const professors = await getProfessorsBySubjectIdFromDatabase(parseInt(idSubject));
    const professorsNames = professors.map( p => p.name);

    return res.status(200).send(professorsNames);
}

async function getProfessorData(req,res) {

    const {id} = req.params;

    const professor = await getProfessorById(id);
    if(!professor) return res.status(500).send({error: "Professor não foi encontrado"});

    const professorAndExams = await insertExamsFromProfessor(professor);
    if(!professor) return res.status(500).send({error: "Ocorreu um problema ao buscar as provas do professor"});

    res.status(200).send(professorAndExams);
}

module.exports = {getList, getProfessorData, getProfessorsBySubjectId}