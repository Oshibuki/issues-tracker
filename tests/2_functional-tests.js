/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
    suite('POST /api/issues/{project} => object with issue data', function() {
      
      test('Every field filled in', function(done) {
       chai.request(server)
        .post('/api/issues/test')
        .send({
            issue_title: 'Every field filled in',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
            assert.equal(res.body['issue_title'], 'Every field filled in');
            assert.equal(res.body['issue_text'], 'text');
            assert.equal(res.body['created_by'], 'Functional Test - Every field filled in');
            assert.equal(res.body['assigned_to'], 'Chai and Mocha');
            assert.equal(res.body['status_text'], 'In QA');
          //fill me in too!
          done();
        });
      });
      
      test('Required fields filled in', function(done) {
          chai.request(server)
              .post('/api/issues/test')
              .send({
                  issue_title: 'Required fields filled in',
                  issue_text: 'text',
                  created_by: 'Functional Test - Required fields filled in',
              })
              .end(function (err, res) {
                  assert.equal(res.status, 200);
                  assert.equal(res.body['issue_title'], 'Required fields filled in');
                  assert.equal(res.body['issue_text'], 'text');
                  assert.equal(res.body['created_by'], 'Functional Test - Required fields filled in');
                  //fill me in too!
                  done();
              });
      });
      
      test('Missing required fields', function(done) {
          chai.request(server)
              .post('/api/issues/test')
              .send({
                  issue_title: 'Required fields filled in',
                  created_by: 'Functional Test - Required fields filled in',
              })
              .end(function (err, res) {
                  assert.equal(res.status, 200);
                  assert.equal(res.text, 'missing inputs');
                  //fill me in too!
                  done();
              });
      });
      
    });
    
    suite('PUT /api/issues/{project} => text', function() {
      
      test('No body', function(done) {
          chai.request(server)
              .post('/api/issues/test')
              .send({
                  issue_title: 'No body',
                  issue_text: 'text',
                  created_by: 'Functional Test - Every field filled in',
                  assigned_to: 'Chai and Mocha',
                  status_text: 'In QA'
              }).end(function (err, res) {
              if (err) {
                  console.log(err);
              } else {
                  chai.request(server)
                      .put('/api/issues/test')
                      .send({_id: res.body["_id"]})
                      .end(function (err, res) {
                          assert.equal(res.status, 200);
                          assert.equal(res.text, 'no updated field sent');
                          done();
                      });
              }
          })

      });
      
      test('One field to update', function(done) {
          chai.request(server)
              .post('/api/issues/test')
              .send({
                  issue_title: 'One field to update',
                  issue_text: 'text',
                  created_by: 'Functional Test - One field to update',
                  assigned_to: 'Chai and Mocha',
                  status_text: 'In QA'
              }).end(function (err, res) {
              if (err) {
                  console.log(err);
              } else {
                  chai.request(server)
                      .put('/api/issues/test')
                      .send({_id: res.body["_id"], issue_text: "One field to update"})
                      .end(function (err, res) {
                          assert.equal(res.status, 200);
                          assert.equal(res.body.issue_text, "One field to update");
                          done();
                      });
              }
          })
      });
      
      test('Multiple fields to update', function(done) {
          chai.request(server)
              .post('/api/issues/test')
              .send({
                  issue_title: 'Multiple fields to update',
                  issue_text: 'text',
                  created_by: 'Functional Test - Multiple fields to update',
                  assigned_to: 'Chai and Mocha',
                  status_text: 'In QA'
              }).end(function (err, res) {
              if (err) {
                  console.log(err);
              } else {
                  chai.request(server)
                      .put('/api/issues/test')
                      .send({
                          _id: res.body["_id"],
                          issue_text: "Multiple fields to update",
                          assigned_to: "Multiple fields to update"
                      })
                      .end(function (err, res) {
                          assert.equal(res.status, 200);
                          assert.equal(res.body.issue_text, "Multiple fields to update");
                          assert.equal(res.body.assigned_to, "Multiple fields to update");
                          done();
                      });
              }
          })
      });
      
    });
    
    suite('GET /api/issues/{project} => Array of objects with issue data', function() {
      
      test('No filter', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
      test('One filter', function(done) {
          chai.request(server)
              .get('/api/issues/test')
              .query({open: true})
              .end(function (err, res) {
                  assert.equal(res.status, 200);
                  assert.isArray(res.body);
                  assert.property(res.body[0], 'issue_title');
                  assert.property(res.body[0], 'issue_text');
                  assert.property(res.body[0], 'created_on');
                  assert.property(res.body[0], 'updated_on');
                  assert.property(res.body[0], 'created_by');
                  assert.property(res.body[0], 'assigned_to');
                  assert.property(res.body[0], 'open');
                  assert.property(res.body[0], 'status_text');
                  assert.property(res.body[0], '_id');
                  assert.isTrue(res.body[0].open);
                  done();
              });
        
      });
      
      test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
          chai.request(server)
              .get('/api/issues/test')
              .query({open: true, issue_text: "One field to update"})
              .end(function (err, res) {
                  assert.equal(res.status, 200);
                  assert.isArray(res.body);
                  assert.property(res.body[0], 'issue_title');
                  assert.property(res.body[0], 'issue_text');
                  assert.property(res.body[0], 'created_on');
                  assert.property(res.body[0], 'updated_on');
                  assert.property(res.body[0], 'created_by');
                  assert.property(res.body[0], 'assigned_to');
                  assert.property(res.body[0], 'open');
                  assert.property(res.body[0], 'status_text');
                  assert.property(res.body[0], '_id');
                  assert.isTrue(res.body[0].open);
                  assert.equal(res.body[0].issue_text, "One field to update")
                  done();
              });
      });
      
    });
    
    suite('DELETE /api/issues/{project} => text', function() {
      
      test('No _id', function(done) {
          chai.request(server)
              .delete('/api/issues/test')
              .query({})
              .end(function (err, res) {
                  assert.equal(res.status, 200);
                  assert.equal(res.text, "_id error")
                  done();
              });
      });
      
      test('Valid _id', function(done) {
          chai.request(server)
              .post('/api/issues/test')
              .send({
                  issue_title: 'Valid _id Delete',
                  issue_text: 'text',
                  created_by: 'Functional Test - Valid _id Delete',
                  assigned_to: 'Chai and Mocha',
                  status_text: 'In QA'
              }).end(function (err, res) {
              if (err) {
                  console.log(err);
              } else {
                  const _id = res.body["_id"]
                  chai.request(server)
                      .delete('/api/issues/test')
                      .query()
                      .send({_id: _id})
                      .end(function (err, res) {
                          assert.equal(res.status, 200);
                          assert.equal(res.text, 'deleted ' + _id);
                          done();
                      });
              }
          })
      });
      
    });

});
