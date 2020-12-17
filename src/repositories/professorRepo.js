const db = require('../database/index')

async function getProfessorIdByItsName(name) {

    try {
        const result = await db.query('SELECT id FROM professors WHERE name = $1', [name]);
        return result.rows[0].id;
    } catch (e) {
        return null;
    }
}

async function getProfessorById(id) {

    try {
        const result = await db.query('SELECT * FROM professors WHERE id = $1', [id]);
        return result.rows[0];
    } catch (e) {
        return null;
    }
}

async function matchIdsSubjectAndProfessor(idSubject, idProfessor) {

    try {
        const result = await db.query('SELECT * FROM "professors_subjects" WHERE "idSubject" = $1 AND "idProfessor" = $2', [idSubject, idProfessor]);
        return result.rows[0];
    } catch (e) {
        return null;
    }
}

async function getListAllProfessors(idSubject, idProfessor) {

    try {
        const result = await db.query('SELECT * FROM professors');
        return result.rows;
    } catch (e) {
        return null;
    }
}

async function insertQuantitiesOfExamsInObject(professors) {

    try {
        const objectWithQuantitie = await Promise.all( professors.map ( async p => {
            const result = await db.query('SELECT * FROM exams WHERE  "idProfessor" = $1 ', [p.id]);
            return {...p, numberOfExams: result.rows.length};
        }));

        return objectWithQuantitie;
    } catch (e) {
        return null;
    }
}

async function insertExamsFromProfessor(professor) {

    try {      
        const result = await db.query(`
            SELECT s.name AS subject, e.name, e.categorie, e.link FROM exams AS e
            JOIN professors AS p ON e."idProfessor" = p.id
            JOIN subjects AS s ON e."idSubject" = s.id
            WHERE p.id = $1`, [professor.id]);

        const objectProfessor = {...professor, exams: [...result.rows] };
        return objectProfessor;
    } catch (e) {
        return null;
    }
}

module.exports = {
    getProfessorIdByItsName, 
    matchIdsSubjectAndProfessor, 
    getListAllProfessors,
    insertQuantitiesOfExamsInObject,
    getProfessorById,
    insertExamsFromProfessor,
};