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
const lecture_resource_1 = require("../../../resources/lecture.resource");
const lecture_model_1 = require("../model/lecture.model");
const express = require("express");

class LectureRoutes {
  constructor() {
    this.lectureRouter = express.Router();
    this.router();
  }

  router() {
    this.lectureRouter.post('/lectures', createLecture);
    this.lectureRouter.get('/lectures', listLecture);
    this.lectureRouter.get('/lectures/lectureIndex/:lectureIndex', getLectureByLectureIndex);
    this.lectureRouter.get('/lectures/lectureCode/:lectureCode', getLectureByLectureCode);
    this.lectureRouter.get('/lectures/professorName/:professorName', getLectureByProfessorName);
    this.lectureRouter.get('/lectures/lectureName/:lectureName', getLectureByLectureName);
    this.lectureRouter.get('/lectures/track/:track', getLectureByTrack);
    this.lectureRouter.put('/lectures/:lectureIndex', updateLecture);
    this.lectureRouter.delete('/lectures/:lectureIndex', deleteLecture);
  }
}

exports.LectureRoutes = LectureRoutes;

/**
 * route: lecture 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function createLecture(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    let lectureData = new lecture_resource_1.LectureResource(req.body);
    try {
      const result = yield lecture_model_1.lecture.createLecture(lectureData.getLecture());
      res.send(result);
    }
    catch (err) {
      res.send(err);
    }
  });
}

/**
 * route: lecture 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function listLecture(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const result = yield lecture_model_1.lecture.listLecture();
      res.send(result);
    }
    catch (err) {
      res.send(err);
    }
  });
}

/**
 * route: lecture index 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getLectureByLectureIndex(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      let lectureIndex = req.params.lectureIndex;
      const result = yield lecture_model_1.lecture.getLectureByLectureIndex(lectureIndex);
      res.send(result);
    }
    catch (err) {
      res.send(err);
    }
  });
}

/**
 * route: lecture code 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getLectureByLectureCode(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      let lectureCode = req.params.lectureCode;
      const result = yield lecture_model_1.lecture.getLectureByLectureCode(lectureCode);
      res.send(result);
    }
    catch (err) {
      res.send(err);
    }
  });
}

/**
 * route: lecture professorName 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getLectureByProfessorName(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      let professorName = req.params.professorName;
      const result = yield lecture_model_1.lecture.getLectureByProfessorName(professorName);
      res.send(result);
    }
    catch (err) {
      res.send(err);
    }
  });
}

/**
 * route: lecture lectureName 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getLectureByLectureName(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      let lectureName = req.params.lectureName;
      const result = yield lecture_model_1.lecture.getLectureByLectureName(lectureName);
      res.send(result);
    }
    catch (err) {
      res.send(err);
    }
  });
}

/**
 * route: lecture track 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getLectureByTrack(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      let track = req.params.track;
      const result = yield lecture_model_1.lecture.getLectureByTrack(track);
      res.send(result);
    }
    catch (err) {
      res.send(err);
    }
  });
}

/**
 * route: lecture 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function updateLecture(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      let lectureIndex = req.params.lectureIndex;
      let lectureData = new lecture_resource_1.LectureResource(req.body);
      const result = yield lecture_model_1.lecture.updateLecture(lectureIndex, lectureData.getLecture());
      res.send(result);
    }
    catch (err) {
      res.send(err);
    }
  });
}

/**
 * route: lecture 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function deleteLecture(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      let lectureIndex = req.params.lectureIndex;
      const result = yield lecture_model_1.lecture.deleteLecture(lectureIndex);
      res.send(result);
    }
    catch (err) {
      res.send(err);
    }
  });
}

exports.lectureRoutes = new LectureRoutes();
//# sourceMappingURL=lecture.route.js.map