const supertest = require('supertest');
const app = require('../app');
const db = require('../database/index');

afterAll(() => {
    db.end();
})

describe('Test Routes GET', () => {

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

    it('should return 200 with exams in Object', async () => {

        const res = await supertest(app).get('/professors/1');

        expect.arrayContaining(res.body)
        expect(res.status).toBe(200);
    })
})