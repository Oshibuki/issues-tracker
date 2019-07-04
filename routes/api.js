/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
const mongoose = require("mongoose")
const issue = require("../models/issue.model")
require("dotenv").config();

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});
mongoose.connect(CONNECTION_STRING, {useNewUrlParser: true});


module.exports = function (app) {

  app.route('/api/issues/:project')

    .get(function (req, res){
      const project = req.params.project;
      const filter = {project: project, ...req.query}
      if (typeof filter.open !== "undefined") {
        if (filter.open === "true") filter.open = true;
        else filter.open = false;
      }
      issue.find(filter, function (err, result) {
        if (err) {
          res.send(err.message)
        } else {
          res.json(result)
        }
      })
      
    })

      .post(async function (req, res) {
      var project = req.params.project;
        let params = {
          project: project,
          ...req.body
        }
        try {
          let result = await issue.create(params)
          res.json(result)
        } catch (e) {
          let message = e.message;
          if (/Path.*is required/gi.test(e.message)) {
            message = "missing inputs"
          }
          res.send(message)
        }
    })

      .put(async function (req, res) {
        let project = req.params.project;
        let params = {
          ...req.body
        };
        if (!params._id || !(params.open || params.issue_title || params.issue_text || params.created_by || params.assigned_to || params.status_text)) {
          return res.send('no updated field sent')
        }
        try {
          let result = await issue.findByIdAndUpdate(req.body._id, params, {omitUndefined: true, new: true});
          res.json(result)
        } catch (e) {
          let message = e.message;
          res.send(message)
        }
      
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      const _id = req.body._id
      if (_id) {
        issue.findByIdAndDelete(req.body._id, function (err, result) {
          if (err) {
            res.send('could not delete ' + _id)
          } else {
            res.send('deleted ' + _id)
          }
        })

      } else {
        res.send("_id error")
      }
      
    });
    
};
