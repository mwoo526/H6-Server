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
const lectureInfo_model_1 = require("../model/lectureInfo.model");
class LectureInfoRoutes {
    constructor() {
        this.lectureInfoRouter = express.Router();
        this.router();
    }
    router() {
        this.lectureInfoRouter.get('/lecturesInfo/lectureName/:lectureName', getLectureInfoByLectureName);
        this.lectureInfoRouter.get('/lecturesInfo/professorName/:professorName', getLectureInfoByProfessorName);
    }
}
exports.LectureInfoRoutes = LectureInfoRoutes;
function getLectureInfoByLectureName(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let lectureName = req.params.lectureName;
            const result = yield lectureInfo_model_1.lectureInfo.getLectureInfoByLectureName(lectureName);
            res.send(result);
        }
        catch (err) {
            res.send(err);
        }
    });
}
function getLectureInfoByProfessorName(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let professorName = req.params.professorName;
            const result = yield lectureInfo_model_1.lectureInfo.getLectureInfoByProfessorName(professorName);
            res.send(result);
        }
        catch (err) {
            res.send(err);
        }
    });
}
exports.lectureInfoRoutes = new LectureInfoRoutes();
//# sourceMappingURL=lectureInfo.route.js.map