process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/server/index');
const realm = require('../src/server/realm/index')[process.env.NODE_ENV]();

describe('routes : companies', () => {

  beforeEach(() => {
    // clear companies table before running tests
    realm.write(() => {
      realm.delete(realm.objects('Company'));
    });
  });

//  afterEach(() => {
//    return knex.migrate.rollback();
//  });

  describe('GET /api/v1/companies', () => {
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
  });



//  describe('POST /api/v1/companies', () => {
//    it('should return the company that was added', (done) => {
//      chai.request(server)
//      .post('/api/v1/companies')
//      .send({
//        companyName: 'Test Company',
//        notes: '',
//        notesSalt: ''
//      })
//      .end((err, res) => {
//        // there should be no errors
//        should.not.exist(err);
//        // there should be a 201 status code
//        // (indicating that something was "created")
//        res.status.should.equal(201);
//        // the response should be JSON
//        res.type.should.equal('application/json');
//        // the JSON response body should have a
//        // key-value pair of {"status": "success"}
//        res.body.status.should.eql('success');
//        // the JSON response body should have a
//        // key-value pair of {"data": 1 movie object}
//        res.body.data[0].should.include.keys(
//          'id', 'companyName', 'notes', 'notesSalt'
//        );
//        done();
//      });
//    });
//    it('should throw an error if the payload is malformed', (done) => {
//      chai.request(server)
//      .post('/api/v1/movies')
//      .send({
//        name: 'Titanic'
//      })
//      .end((err, res) => {
        // there should an error
//        should.exist(err);
        // there should be a 400 status code
//        res.status.should.equal(400);
        // the response should be JSON
//        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "error"}
//        res.body.status.should.eql('error');
        // the JSON response body should have a message key
//        should.exist(res.body.message);
//        done();
//      });
//    });
//  });

});
