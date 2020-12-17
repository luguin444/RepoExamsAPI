const db = require('../database/index')

async function getSubjectIdByItsName(name) {

    try {
        const result = await db.query('SELECT id FROM subjects WHERE name = $1', [name]);
        return result.rows[0].id;
    } catch (e) {
        return null;
    }
}

module.exports = {getSubjectIdByItsName};