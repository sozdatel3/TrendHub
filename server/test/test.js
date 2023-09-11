const assert = require('assert');
const request = require('supertest');
const {app} = require('../src/server');


describe('Repository Synchronization', () => {
  it('should synchronize repositories successfully', (done) => {
    request(app)
      .get('/sync')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('Get All Repositories', () => {
  it('should return a list of repositories', (done) => {
    request(app)
      .get('/repositories')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('Find Repository', () => {
  it('should return a specific repository', (done) => {
    const repoName = 'react'; 
    request(app)
      .get(`/repositories/${repoName}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});