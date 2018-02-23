"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const lectureInfo_resource_1 = require("../../../resources/lectureInfo.resource");
const lectureInfo_model_1 = require("../model/lectureInfo.model");
class LectureInfoRoutes {
    constructor() {
        this.lectureInfoRouter = express.Router();
        this.router();
    }
    router() {
        this.lectureInfoRouter.post('/lecturesInfo', createLectureInfo);
        this.lectureInfoRouter.get('/lecturesInfo', listLectureInfo);
        this.lectureInfoRouter.get('/lecturesInfo/lectureInfoIndex/:lectureInfoIndex', getLectureInfoByLectureInfoIndex);
        this.lectureInfoRouter.get('/lecturesInfo/lectureName/:lectureName', getLectureInfoByLectureName);
        this.lectureInfoRouter.get('/lecturesInfo/professorName/:professorName', getLectureInfoByProfessorName);
        this.lectureInfoRouter.put('/lecturesInfo/:lectureInfoIndex', updateLectureInfo);
        this.lectureInfoRouter.delete('/lecturesInfo/:lectureInfoIndex', deleteLectureInfo);
    }
}
exports.LectureInfoRoutes = LectureInfoRoutes;
/**
 * route: lectureInfo 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function createLectureInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let lectureInfoData = new lectureInfo_resource_1.LectureInfoResource(req.body);
        try {
            const result = yield lectureInfo_model_1.lectureInfo.createLectureInfo(lectureInfoData.getLectureInfo());
            res.send(result);
        }
        catch (err) {
            res.send(err);
        }
    });
}
/**
 * route: lectureInfo 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function listLectureInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield lectureInfo_model_1.lectureInfo.listLectureInfo();
            res.send(result);
        }
        catch (err) {
            res.send(err);
        }
    });
}
/**
 * route: lectureInfo index 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getLectureInfoByLectureInfoIndex(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let lectureInfoIndex = req.params.lectureInfoIndex;
        try {
            const result = yield lectureInfo_model_1.lectureInfo.getLectureInfoByLectureInfoIndex(lectureInfoIndex);
            res.send(result);
        }
        catch (err) {
            res.send(err);
        }
    });
}
/**
 * route: lectureInfo lectureName 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getLectureInfoByLectureName(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let lectureName = req.params.lectureName;
        try {
            const result = yield lectureInfo_model_1.lectureInfo.getLectureInfoByLectureName(lectureName);
            res.send(result);
        }
        catch (err) {
            res.send(err);
        }
    });
}
/**
 * route: lectureInfo professorName 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getLectureInfoByProfessorName(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let professorName = req.params.professorName;
        try {
            const result = yield lectureInfo_model_1.lectureInfo.getLectureInfoByProfessorName(professorName);
            res.send(result);
        }
        catch (err) {
            res.send(err);
        }
    });
}
/**
 * route: lectureInfo 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function updateLectureInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let lectureInfoIndex = req.params.lectureInfoIndex;
        let lectureInfoData = new lectureInfo_resource_1.LectureInfoResource(req.body);
        try {
            const result = yield lectureInfo_model_1.lectureInfo.updateLectureInfo(lectureInfoIndex, lectureInfoData);
            res.send(result);
        }
        catch (err) {
            res.send(err);
        }
    });
}
/**
 * route: lectureInfo 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function deleteLectureInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let lectureInfoIndex = req.params.lectureInfoIndex;
        try {
            const result = yield lectureInfo_model_1.lectureInfo.deleteLectureInfo(lectureInfoIndex);
            res.send(result);
        }
        catch (err) {
            res.send(err);
        }
    });
}
exports.lectureInfoRoutes = new LectureInfoRoutes();
//# sourceMappingURL=lectureInfo.route.js.map