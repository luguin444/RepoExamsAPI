const supertest = require('supertest');
const app = require('../app');
const db = require('../database/index');

async function cleanDataBase() {
   // await db.query(`DELETE FROM exams`);
}

beforeAll(async () => {
    await cleanDataBase();
});

afterAll( async () => {
    await cleanDataBase();
    db.end();
})


describe('Test Route Post New Exam', () => {

    it('should return 201', async () => {
        const body = {
            "name": "2020.1",
            "subject": "Matematica",
            "professor": "Luis",
            "categorie": "P1",
            "link": "http://www.eq.ufrj.br/download/programa-mac-128.pdf"
        }

        const res = await supertest(app).post('/new-exam').send(body);

        expect(res.status).toBe(201);
    })

    it('should return 422 because there is element that is not an activitie', async () => {
        const body = {
            "name": "2020.1",
            "subject": "Luis",
            "professor": "Luis",
            "categorie": "P1",
            "link": "NAO E UM LINK"
        }

        const res = await supertest(app).post('/new-exam').send(body);

        expect(res.status).toBe(422);
    })

    it('should return 500 because there is no professor that teaches this subject', async () => {
        const body = {
            "name": "2020.1",
            "subject": "Geografia",
            "professor": "Rogerio",
            "categorie": "P1",
            "link": "http://www.eq.ufrj.br/download/programa-mac-128.pdf"
        }

        const res = await supertest(app).post('/new-exam').send(body);

        expect(res.status).toBe(500);
    })
})
