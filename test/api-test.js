const request = require('supertest');
const expect = require('chai').expect;

const app = require('../server');

describe('Oauth API', function() {
    it('Should success if credential is valid', function(done) {
        request(app)
           .post('/oauth_request')
           .expect('Content-Type', /json/)
           .expect(200, done);
    }); 
    it('Should get user profile detail', function(done) {
        request(app)
           .post('/connect?screen_name=sonipandey1&access_token_key=358324540-XjIfpOoD4hAYI1kjvCaR4JDPUvMcNOkpFe5sVBH9&access_token_secret=y3OUXsXTat5jYk2EluLIR8hplTLsMjhmYxHcYBBCOvpXR')
           .field('screen_name','sonipandey1')
           .expect('Content-Type', /json/)
           .expect(200, done);
    }); 
    it('Should not get user profile detail with wrong access_key', function(done) {
        request(app)
           .post('/connect?screen_name=sonipandey1&access_token_key=358324540-XjIfpOoD4hAYI1kjvCaR4JDPUvMcNOkpFe5sVBH9&access_token_secret=y3OUXsXTat5jYk2EluLIR8hplTLsMjhmYxHcYBBCOvpXR')
           .field('screen_name','sonipandey1')
           .expect('Content-Type', /json/)
           .expect(401, done);
    }); 
    it('Should not get user profile detail with wrong access_secret_key', function(done) {
        request(app)
            .post('/connect?screen_name=sonipandey1&access_token_key=358324540-XjIfpOoD4hAYI1kjvCaR4JDPUvMcNOkpFe5sVBH9&access_token_secret=y3OUXsXTat5jYk2EluLIR8hplTLsMjhmYxHcYBBCOvpXR')
           .expect('Content-Type', /json/)
           .expect(401, done);
    }); 
    it('Should get latest tweets', function(done) {
        request(app)
           .get('/tweets?screen_name=sonipandey1&access_token_key=358324540-XjIfpOoD4hAYI1kjvCaR4JDPUvMcNOkpFe5sVBH9&access_token_secret=y3OUXsXTat5jYk2EluLIR8hplTLsMjhmYxHcYBBCOvpXR')
           .expect('Content-Type', /json/)
           .expect(200, done);
    }); 
    it('Should not get tweets with wrong access_key', function(done) {
        request(app)
           .get('/tweets?screen_name=sonipandey1&access_token_key=358324540-XjIfpOoD4hAYI1kjvCaR4JDPUvMcNOkpFe5sVBH9&access_token_secret=y3OUXsXTat5jYk2EluLIR8hplTLsMjhmYxHcYBBCOvpXR')
           .expect('Content-Type', /json/)
           .expect(401, done);
    }); 
    it('Should not get tweets with wrong access_secret_key', function(done) {
        request(app)
           .get('/tweets?screen_name=sonipandey1&access_token_key=358324540-XjIfpOoD4hAYI1kjvCaR4JDPUvMcNOkpFe5sVBH9&access_token_secret=y3OUXsXTat5jYk2EluLIR8hplTLsMjhmYxHcYBBCOvpXR')
           .expect('Content-Type', /json/)
           .expect(401, done);
    }); 
});