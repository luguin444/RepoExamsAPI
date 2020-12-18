const db = require('../database/index')

async function getSubjectIdByItsName(name) {

    try {
        const result = await db.query('SELECT id FROM subjects WHERE name = $1', [name]);
        return result.rows[0].id;
    } catch (e) {
        return null;
    }
}

async function getSubjectById(id) {

    try {
        const result = await db.query('SELECT * FROM subjects WHERE id = $1', [id]);
        return result.rows[0];
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

async function insertExamsFromSubject(subject) {

    try {      
        const result = await db.query(`
            SELECT p.name AS professor, e.name, e.categorie, e.link FROM exams AS e
            JOIN professors AS p ON e."idProfessor" = p.id
            JOIN subjects AS s ON e."idSubject" = s.id
            WHERE s.id = $1`, [subject.id]);

        const objectSubject = {...subject, exams: [...result.rows] };
        return objectSubject;
    } catch (e) {
        return null;
    }
}

module.exports = {
    getSubjectIdByItsName,
    getListAllSubjects,
    insertQuantitiesOfExamsInObject,
    getSubjectById,
    insertExamsFromSubject,
};