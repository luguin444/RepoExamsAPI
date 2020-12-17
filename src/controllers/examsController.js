const db = require('../database/index')

async function postExam(req,res) {
    
    // const object = {
    //     "name": "2020.1",
    //     "idSubject": 2,
    //     "idProfessor": 1,
    //     "categorie": "P1",
    //     "link": "lalalala"
    // }
    const name = "2020.1"

    // const result = await db.query('INSERT INTO exams (name,"idSubject","idProfessor",categorie,link) VALUES ($1,$2,$)') 

    try {
        const result = await db.query('INSERT INTO exams (name) VALUES ($1)', [name]);
        console.log(result);
        res.send(200)
    } catch(e) {
        console.log(e);
        res.send(500);
    }
}


module.exports = {postExam}