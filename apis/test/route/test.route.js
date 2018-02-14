"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const express = require("express");
const test_model_1 = require("../model/test.model");

class TestRoutes {
  constructor() {
    this.testRouter = express.Router();
    this.router();
  }

  router() {
    /**
     * 라우트: 테스트 생성
     */
    this.testRouter.post('/test', function (req, res) {
      let name = req.body.name;
      try {
        let result = test_model_1.test.createName(name);
        res.send(result);
      }
      catch (err) {
        res.send(err.message);
      }
    });
    /**
     * 라우트: 테스트 리스트 조회
     */
    this.testRouter.get('/test', function (req, res) {
      try {
        let result = test_model_1.test.listName();
        res.send(result);
      }
      catch (err) {
        res.send(err.message);
      }
    });
    /**
     * 라우트: 테스트 name 조회
     */
    this.testRouter.get('/test/:name', function (req, res) {
      let name = req.params.name;
      try {
        let result = test_model_1.test.getName(name);
        res.send(result);
      }
      catch (err) {
        res.send(err.message);
      }
    });
    /**
     * 라우트: 테스트 업데이트
     */
    this.testRouter.put('/test/:name', function (req, res) {
      let name = req.params.name;
      try {
        let result = test_model_1.test.updateName(name, 'Mike');
        res.send(result);
      }
      catch (err) {
        res.send(err.message);
      }
    });
    /**
     * 라우트: 테스트 삭제
     */
    this.testRouter.delete('/test/:name', function (req, res) {
      let name = req.params.name;
      try {
        let result = test_model_1.test.deleteName(name);
        res.send(result);
      }
      catch (err) {
        res.send(err.message);
      }
    });
  }
}

exports.TestRoutes = TestRoutes;
exports.testRoutes = new TestRoutes();
//# sourceMappingURL=test.route.js.map