const db = require('../database/index')

async function getSubjectIdByItsName(name) {

    try {
        const result = await db.query('SELECT id FROM subjects WHERE name = $1', [name]);
        return result.rows[0].id;
    } catch (e) {
        return null;
    }
}

async function getListAllSubjects(idSubject, idProfessor) {

    try {
        const result = await db.query('SELECT * FROM subjects');
        return result.rows;
    } catch (e) {
        return null;
    }
}

async function insertQuantitiesOfExamsInObject(subjects) {

    try {
        const objectWithQuantitie = await Promise.all( subjects.map ( async s => {
            const result = await db.query('SELECT * FROM exams WHERE  "idSubject" = $1 ', [s.id]);
            return {...s, numberOfExams: result.rows.length};
        }));
        return objectWithQuantitie;
    } catch (e) {
        return null;
    }
}

module.exports = {
    getSubjectIdByItsName,
     getListAllSubjects,
     insertQuantitiesOfExamsInObject,
    };