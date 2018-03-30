"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, "__esModule", {value: true});
const express = require("express");
const lectureReply_resource_1 = require("../../../resources/lectureReply.resource");
const lectureReply_model_1 = require("../model/lectureReply.model");

class LectureReplyRoutes {
  constructor() {
    this.lectureReplyRouter = express.Router();
    this.router();
  }

  router() {
    this.lectureReplyRouter.post('/lecturesReply', createLectureReply);
    this.lectureReplyRouter.get('/lecturesReply', pageListLectureReply);
    this.lectureReplyRouter.get('/lecturesReply/lectureReplyIndex/:lectureReplyIndex', getLectureReplyByLectureReplyIndex);
    this.lectureReplyRouter.get('/lecturesReply/userId/:userId', pageGetLectureReplyByUserId);
    this.lectureReplyRouter.get('/lecturesReply/userNickName/:userNickName', pageGetLectureReplyByUserNickName);
    this.lectureReplyRouter.put('/lecturesReply/lectureReplyIndex/:lectureReplyIndex', updateLectureReply);
    this.lectureReplyRouter.delete('/lecturesReply/lectureReplyIndex/:lectureReplyIndex', deleteLectureReply);
  }
}

exports.LectureReplyRoutes = LectureReplyRoutes;

/**
 * route: lectureReply 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function createLectureReply(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    let lectureReplyData = new lectureReply_resource_1.LectureReplyResource(req.body);
    try {
      const result = yield lectureReply_model_1.lectureReply.createLectureReply(lectureReplyData.getLectureReply());
      res.send(result);
    }
    catch (err) {
      res.send(err);
    }
  });
}

/**
 * route: lectureReply page 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function pageListLectureReply(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    let page = parseInt(req.query.page);
    let count = parseInt(req.query.count);
    try {
      const result = yield lectureReply_model_1.lectureReply.pageListLectureReply(page, count);
      res.send(result);
    }
    catch (err) {
      res.send(err);
    }
  });
}

/**
 * route: lectureReply replyIndex 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getLectureReplyByLectureReplyIndex(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    let lectureReplyIndex = req.params.lectureReplyIndex;
    try {
      const result = yield lectureReply_model_1.lectureReply.getLectureReplyByLectureReplyIndex(lectureReplyIndex);
      res.send(result);
    }
    catch (err) {
      res.send(err);
    }
  });
}

/**
 * route: lectureReply userId 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function pageGetLectureReplyByUserId(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    const userId = req.params.userId;
    let page = parseInt(req.query.page);
    let count = parseInt(req.query.count);
    try {
      const result = yield lectureReply_model_1.lectureReply.pageGetLectureReplyByUserId(userId, page, count);
      res.send(result);
    }
    catch (err) {
      res.send(err);
    }
  });
}

/**
 * route: lectureReply userNickName 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function pageGetLectureReplyByUserNickName(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    const userNickName = req.params.userNickName;
    let page = parseInt(req.query.page);
    let count = parseInt(req.query.count);
    try {
      const result = yield lectureReply_model_1.lectureReply.pageGetLectureReplyByUserNickName(userNickName, page, count);
      res.send(result);
    }
    catch (err) {
      res.send(err);
    }
  });
}

/**
 * route: lectureReply 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function updateLectureReply(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    const lectureReplyIndex = req.params.lectureReplyIndex;
    let lectureReplyData = new lectureReply_resource_1.LectureReplyResource(req.body);
    try {
      const result = yield lectureReply_model_1.lectureReply.updateLectureReply(lectureReplyIndex, lectureReplyData);
      res.send(result);
    }
    catch (err) {
      res.send(err);
    }
  });
}

/**
 * route: lectureReply 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function deleteLectureReply(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    const lectureReplyIndex = req.params.lectureReplyIndex;
    try {
      const result = yield lectureReply_model_1.lectureReply.deleteLectureReply(lectureReplyIndex);
      res.send(result);
    }
    catch (err) {
      res.send(err);
    }
  });
}

exports.lectureReplyRoutes = new LectureReplyRoutes();
//# sourceMappingURL=lectureReply.route.js.map