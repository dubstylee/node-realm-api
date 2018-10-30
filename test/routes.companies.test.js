process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/server/index');
const realm = require('../src/server/realm/index')[process.env.NODE_ENV]();

describe('routes : companies', () => {

  before(() => {
    // clear database before running tests
    realm.write(() => {
      realm.deleteAll();
    });
  });

//  afterEach(() => {
//    return knex.migrate.rollback();
//  });

  describe('GET /api/v1/companies', () => {
    const companies = realm.objects('Company');
    it('should return an empty list', (done) => {
      chai.request(server)
      .get('/api/v1/companies')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        Object.keys(res.body.data).length.should.eql(0);
        done();
      });
    });
    it('count should be 0', (done) => {
      companies.length.should.eql(0);
      done();
    });
    it('should return 3 newly added companies', (done) => {
      realm.write(() => {
        realm.create('Company', { id: '1', companyName: 'test company 1' });
        realm.create('Company', { id: '2', companyName: 'test company 2' });
        realm.create('Company', { id: '3', companyName: 'test company 3' });
      });

      chai.request(server)
      .get('/api/v1/companies')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        Object.keys(res.body.data).length.should.eql(3);
        res.body.data[0].should.include.keys('id', 'companyName', 'notes', 'notesSalt');
        done();
      });
    });
    it('count should be 3', (done) => {
      companies.length.should.eql(3);
      done();
    });
  });

  describe('GET /api/v1/companies/:id', () => {
    it('should respond with a single company', (done) => {
      chai.request(server)
      .get('/api/v1/companies/1')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        res.body.data[0].should.include.keys('id', 'companyName', 'notes', 'notesSalt');
        done();
      });
    });
    it('should throw an error if the company does not exist', (done) => {
      chai.request(server)
      .get('/api/v1/companies/999999')
      .end((err, res) => {
        res.status.should.equal(404);
        res.type.should.equal('application/json');
        res.body.status.should.eql('error');
        res.body.message.should.eql('That company does not exist.');
        done();
      });
    });
  });


  describe('POST /api/v1/companies', () => {
    it('should return the company that was added', (done) => {
      chai.request(server)
      .post('/api/v1/companies')
      .send({
        companyName: 'Test Company',
        notes: '',
        notesSalt: ''
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(201);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        res.body.data.should.include.keys(
          'id', 'companyName', 'notes', 'notesSalt'
        );
        done();
      });
    });
    it('should throw an error if the payload is malformed', (done) => {
      chai.request(server)
      .post('/api/v1/companies')
      .send({
        name: 'Titanic'
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.type.should.equal('application/json');
        res.body.status.should.eql('error');
        should.exist(res.body.message);
        done();
      });
    });
  });

  describe('PUT /api/v1/companies', () => {
    it('should return the company that was updated', (done) => {
      const companies = realm.objects('Company');
      const companyObject = companies[0];
      const oldName = companyObject.companyName;
      chai.request(server)
      .put(`/api/v1/companies/${companyObject.id}`)
      .send({
        companyName: 'new name'
      })
      .end((err, res) => {
        // there should be no errors
        should.not.exist(err);
        // there should be a 200 status code
        res.status.should.equal(200);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        res.body.status.should.eql('success');
        // the JSON response body should have a
        // key-value pair of {"data": 1 movie object}
        res.body.data.should.include.keys(
          'id', 'companyName', 'notes', 'notesSalt'
        );
        // ensure the movie was in fact updated
        companyObject.companyName.should.not.eql(oldName);
        done();
      });
    });
    it('should throw an error if the company does not exist', (done) => {
      chai.request(server)
      .put('/api/v1/companies/9999999')
      .send({
        companyName: 'invalid company'
      })
      .end((err, res) => {
        res.status.should.equal(404);
        res.type.should.equal('application/json');
        res.body.status.should.eql('error');
        res.body.message.should.eql('That company does not exist.');
        done();
      });
    });
  });

  describe('DELETE /api/v1/companies/:id', () => {
    it('should return the id of the company that was deleted', (done) => {
      const companies = realm.objects('Company');
      const companyObject = companies[0];
      const companyId = companyObject.id;
      const lengthBeforeDelete = companies.length;
      chai.request(server)
      .delete(`/api/v1/companies/${companyObject.id}`)
      .end((err, res) => {
        // there should be no errors
        should.not.exist(err);
        // there should be a 200 status code
        res.status.should.equal(200);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        res.body.status.should.eql('success');
        // the JSON response body should have a
        // key-value pair of {"data": 1 movie object}
        res.body.data[0].should.eql(companyId);
        // ensure the movie was in fact deleted
        companies.length.should.eql(lengthBeforeDelete - 1);
        done();
      });
    });
    it('should throw an error if the movie does not exist', (done) => {
      chai.request(server)
      .delete('/api/v1/companies/9999999')
      .end((err, res) => {
        res.status.should.equal(404);
        res.type.should.equal('application/json');
        res.body.status.should.eql('error');
        res.body.message.should.eql('That company does not exist.');
        done();
      });
    });
  });

});