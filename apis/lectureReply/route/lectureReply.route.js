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
const lectureReply_resource_1 = require("../../../resources/lectureReply.resource");
const lectureReply_model_1 = require("../model/lectureReply.model");
class LectureReplyRoutes {
    constructor() {
        this.lectureReplyRouter = express.Router();
        this.router();
    }
    router() {
        this.lectureReplyRouter.post('/lecturesReply', createLectureReply);
        this.lectureReplyRouter.get('/lecturesReply', listLectureReply);
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
 * route: lectureReply 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function listLectureReply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield lectureReply_model_1.lectureReply.listLectureReply();
            res.send(result);
        }
        catch (err) {
            res.send(err);
        }
    });
}
exports.lectureReplyRoutes = new LectureReplyRoutes();
//# sourceMappingURL=lectureReply.route.js.map