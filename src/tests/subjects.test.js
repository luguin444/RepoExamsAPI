const supertest = require('supertest');
const app = require('../app');
const db = require('../database/index');

afterAll( () => {
    db.end();
})

describe('Test Route GET', () => {

    it('should return 200 with exams in Object', async () => {

        const res = await supertest(app).get('/subject/1');

        expect(res.body.exams).toBeTruthy();
        expect(res.status).toBe(200);
    })

    it('should return 200 with exams in Object', async () => {

        const res = await supertest(app).get('/list-subjects');

        expect.arrayContaining(res.body)
        expect(res.status).toBe(200);
    })
})