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
const user_model_1 = require("../model/user.model");
class UserRoutes {
    constructor() {
        this.userRouter = express.Router();
        this.router();
    }
    router() {
        this.userRouter.post('/users', createUser);
        this.userRouter.get('/users', listUser);
        this.userRouter.get('/users/:studentId', getUser);
        this.userRouter.put('/users/:studentId', updateUser);
        this.userRouter.delete('/users/:studentId', deleteUser);
    }
}
exports.UserRoutes = UserRoutes;
/**
 * 라우트: user 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userData = {
            studentId: req.body.studentId,
            name: req.body.name
        };
        try {
            const result = yield user_model_1.user.createUser(userData);
            res.send(result);
        }
        catch (err) {
            res.send(err.message);
        }
    });
}
/**
 * 라우트: user 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function listUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield user_model_1.user.listUser();
            res.send(result);
        }
        catch (err) {
            res.send(err.message);
        }
    });
}
/**
 * 라우트: user studentId 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let studentId = req.params.studentId;
        try {
            const result = yield user_model_1.user.getUser(studentId);
            res.send(result);
        }
        catch (err) {
            res.send(err.message);
        }
    });
}
/**
 * 라우트: user 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let studentId = req.params.studentId;
        let userData = {
            name: req.body.name
        };
        try {
            const result = yield user_model_1.user.updateUser(studentId, userData);
            res.send(result);
        }
        catch (err) {
            res.send(err.message);
        }
    });
}
/**
 * 라우트: user 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let studentId = req.params.studentId;
        try {
            const result = yield user_model_1.user.deleteUser(studentId);
            res.send(result);
        }
        catch (err) {
            res.send(err.message);
        }
    });
}
exports.userRoutes = new UserRoutes();
//# sourceMappingURL=user.route.js.map