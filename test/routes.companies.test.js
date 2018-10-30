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

  describe('GET /api/v1/companies', () => {
    const companies = realm.objects('Company');
    it('initial count should be 0', (done) => {
      companies.length.should.eql(0);
      done();
    });
    it('should return an empty list', (done) => {
      chai.request(server)
      .get('/api/v1/companies')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        const arr = Object.values(res.body.data);
        arr.length.should.eql(0);
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
        const arr = Object.values(res.body.data);
        arr.length.should.eql(3);
        arr.forEach((item) => {
          item.should.have.keys('id', 'companyName', 'notes', 'notesSalt');
        });
        done();
      });
    });
    it('new count should be 3', (done) => {
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
        const company = res.body.data;
        company.should.include.keys('id', 'companyName', 'notes', 'notesSalt');
        done();
      });
    });
    it('should return an error if the company does not exist', (done) => {
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
    it('should return an error when no company is created', (done) => {
      chai.request(server)
      .post('/api/v1/companies')
      .send({})
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(400);
        res.type.should.equal('application/json');
        res.body.status.should.eql('error');
//        res.body.message.should.eql('Something went wrong.');
        done();
      });
    });
    it('should return the company that was added', (done) => {
      const company = { companyName: 'Test Company' }
      chai.request(server)
      .post('/api/v1/companies')
      .send(company)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(201);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        const newCompany = res.body.data;
        newCompany.should.include.keys(
          'id', 'companyName', 'notes', 'notesSalt'
        );
        newCompany.companyName.should.eql(company.companyName);
        done();
      });
    });
    it('should return an error if the payload is malformed', (done) => {
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
      const company = companies[0];
      const oldName = company.companyName;
      chai.request(server)
      .put(`/api/v1/companies/${company.id}`)
      .send({
        companyName: 'new name'
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        const updatedCompany = res.body.data;
        updatedCompany.should.include.keys(
          'id', 'companyName', 'notes', 'notesSalt'
        );
        // company and updatedCompany are both the same object
        company.companyName.should.not.eql(oldName);
        updatedCompany.companyName.should.not.eql(oldName);
        company.companyName.should.eql(updatedCompany.companyName);
        done();
      });
    });
    it('should return an error if the company does not exist', (done) => {
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
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        res.body.data[0].should.eql(companyId);
        companies.length.should.eql(lengthBeforeDelete - 1);
        done();
      });
    });
    it('should return an error if the company does not exist', (done) => {
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
