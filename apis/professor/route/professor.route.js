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
const professor_model_1 = require("../model/professor.model");
const professorResource_1 = require("../../../resource/professorResource");
class ProfessorRoutes {
    constructor() {
        this.professorRouter = express.Router();
        this.router();
    }
    router() {
        this.professorRouter.post('/professors', createProfessor);
        this.professorRouter.get('/professors', listProfessor);
        this.professorRouter.get('/professors/professorIndex/:professorIndex/', getProfessorByProfessorIndex);
        this.professorRouter.get('/professors/professorName/:professorName', getProfessorByProfessorName);
        this.professorRouter.put('/professors/:professorIndex', updateProfessor);
        this.professorRouter.delete('/professors/:professorIndex', deleteProfessor);
    }
}
exports.ProfessorRoutes = ProfessorRoutes;
/**
 * route: professor 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function createProfessor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let professorData = new professorResource_1.ProfessorResource(req.body);
            const result = yield professor_model_1.professor.createProfessor(professorData.getProfessor());
            res.send(result);
        }
        catch (err) {
            res.send(err.message);
        }
    });
}
/**
 * route: professor 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function listProfessor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield professor_model_1.professor.listProfessor();
            res.send(result);
        }
        catch (err) {
            res.send(err.message);
        }
    });
}
/**
 * route: professorIndex 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getProfessorByProfessorIndex(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let professorIndex = req.params.professorIndex;
            const result = yield professor_model_1.professor.getProfessorByProfessorIndex(professorIndex);
            res.send(result);
        }
        catch (err) {
            res.send(err.message);
        }
    });
}
/**
 * route: professorName 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getProfessorByProfessorName(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let professorName = req.params.professorName;
            const result = yield professor_model_1.professor.getProfessorByProfessorName(professorName);
            res.send(result);
        }
        catch (err) {
            res.send(err.message);
        }
    });
}
/**
 * route: professor 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function updateProfessor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let professorIndex = req.params.professorIndex;
            let professorData = new professorResource_1.ProfessorResource(req.body);
            const result = yield professor_model_1.professor.updateProfessor(professorIndex, professorData);
            res.send(result);
        }
        catch (err) {
            res.send(err.message);
        }
    });
}
/**
 * route: professor 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function deleteProfessor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let professorIndex = req.params.professorIndex;
            const result = yield professor_model_1.professor.deleteProfessor(professorIndex);
            res.send(result);
        }
        catch (err) {
            res.send(err.message);
        }
    });
}
exports.professorRoutes = new ProfessorRoutes();
//# sourceMappingURL=professor.route.js.map