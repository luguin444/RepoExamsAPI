const db = require('../database/index')

async function getProfessorIdByItsName(name) {

    try {
        const result = await db.query('SELECT id FROM professors WHERE name = $1', [name]);
        return result.rows[0].id;
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

module.exports = {getProfessorIdByItsName, matchIdsSubjectAndProfessor};