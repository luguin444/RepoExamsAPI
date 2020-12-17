const db = require('../database/index')

async function insertNewExam(data, idSubject, idProfessor) {
    
    try {
        const result = await db.query(
            `INSERT INTO exams (name, "idSubject", "idProfessor", categorie, link) 
            VALUES ($1,$2,$3,$4,$5) RETURNING *`, [data.name, idSubject, idProfessor, data.categorie, data.link]);    
            return result.rows[0];
    } catch (e) {
        return null;
    }
}

module.exports = {insertNewExam};