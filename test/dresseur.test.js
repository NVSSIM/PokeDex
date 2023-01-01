import supertest from 'supertest';
import * as assert from 'assert';
import listener from '../src/index.js';

const request = supertest(listener);
let dresseurId = null

async function getToken(login, password) {
    let code = null;
    const authResponse = await request
        .get('/Oauth/authorize')
        .query({
            client_id: 'OAUTH_TEST_APP',
            scopes: 'ADMIN',
            redirect_uri: 'google.com',
        }).expect(200);
    code = authResponse.body.authorizationCode;

    const response = await request
        .post('/Oauth/token')
        .query({
            client_id: 'OAUTH_TEST_APP',
            client_secret: 'OAUTH_TEST_APP_SECRET',
            code
        })
        .send({
            login,
            password,
        }).expect(200);
    return `Bearer ${response.body.accessToken}`;
}



describe('Dresseur tests', () => {
    describe('dummy test', () => {
        it('it should pass', (done) => {
            assert.equal(1,1)
            done()
        });
    })

    describe('register nouveau dresseur', () => {
        it('it should return 201', (done) => {
            request.post('/dresseur/create')
                .send({
                    login: 'Maurice',
                    password: 'user',
                    prenom: 'Maurice',
                    nom: 'NaimepasleJs',
                    age: 98,
                })
                .expect('Content-Type', /json/)
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    dresseurId = res.body.id
                    return done();
                });
        });
    })
    describe('dresseur infos', () => {
        it('it should return 200', async () => {
            const res = await request.get('/dresseur/info/'+dresseurId)
                .set('Authorization', await getToken('Maurice','user'))
                .expect('Content-Type', /json/)
                .expect(200)
            assert.equal(res.body.dresseur.login,'Maurice')
            assert.equal(res.body.dresseur.prenom,'Maurice')
            assert.equal(res.body.dresseur.nom,'NaimepasleJs')
            assert.equal(res.body.dresseur.age,98)
            return res;
        });
    })
})