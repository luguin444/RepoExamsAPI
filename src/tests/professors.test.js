const supertest = require('supertest');
const app = require('../app');
const db = require('../database/index');

// async function cleanDataBase() {
//     // await db.query(`DELETE FROM exams`);
// }

// beforeAll(async () => {
//     await cleanDataBase();
// });

afterAll( async () => {
    // await cleanDataBase();
    db.end();
})


describe('Test Route GET', () => {

    it('should return 200 with exams in Object', async () => {

        const res = await supertest(app).get('/professor/1');

        expect(res.body.exams).toBeTruthy();
        expect(res.status).toBe(200);
    })

    it('should return 200 with exams in Object', async () => {

        const res = await supertest(app).get('/list-professors');

        expect.arrayContaining(res.body)
        expect(res.status).toBe(200);
    })
})