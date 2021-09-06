const request = require('supertest');
const { expect } = require('chai');
const semver = require('semver')

const { app } = require('../core');

describe('Server Tests', () => {
  before(done => {
    app.listen(err => {
      if (err) return done(err);
      done();
    });
  });

  it('Endpoint returns a valid version', done => {
    request(app)
      .get('/version')
      .expect(200, (err, res) => {
        if (err) return done(err);

        expect(res.statusCode).to.equal(200);
        /* returns null when not valid */
        expect(!!semver.valid(res.text)).to.be.true;

        done();
      });
  });

  it('Endpoint returns a manifest', done => {
    done();
  });

  it('Endpoint responds with a 404 when no manifest is suppled', done => {
    request(app)
      .get('/manifest.json')
      .expect(404)
      .end(done)
  });
});
