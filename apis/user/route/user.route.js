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
const encryption_utli_1 = require("../../../packages/utils/encryption.utli");
const user_resource_1 = require("../../../resources/user.resource");
const user_model_1 = require("../model/user.model");
class UserRoutes {
    constructor() {
        this.userRouter = express.Router();
        this.router();
    }
    router() {
        this.userRouter.post('/users', createUser);
        this.userRouter.get('/users', listUser);
        this.userRouter.get('/users/:page/:count', pageListUser);
        this.userRouter.get('/users/:userId', getUser);
        this.userRouter.put('/users/:userId', updateUser);
        this.userRouter.put('/users/:userId/password', updateUserPassword);
        this.userRouter.delete('/users/:userId', deleteUser);
    }
}
exports.UserRoutes = UserRoutes;
/**
 * route: user 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userData = new user_resource_1.UserResource(req.body);
        try {
            const result = yield user_model_1.user.createUser(userData);
            res.send(result);
        }
        catch (err) {
            res.send(err);
        }
    });
}
/**
 * route: user 리스트 조회
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
            res.send(err);
        }
    });
}
/**
 * route: user page 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function pageListUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let page = parseInt(req.params.page);
            let count = parseInt(req.params.count);
            const result = yield user_model_1.user.pageListUser(page, count);
            res.send(result);
        }
        catch (err) {
            res.send(err);
        }
    });
}
/**
 * route: user userId 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userId = req.params.userId;
        try {
            const result = yield user_model_1.user.getUser(userId);
            res.send(result);
        }
        catch (err) {
            res.send(err);
        }
    });
}
/**
 * route: user 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userId = req.params.userId;
        let userData = {
            userNickName: req.body.userNickName,
            email: req.body.email,
            major: req.body.major,
            minor: req.body.minor,
            doubleMajor: req.body.doubleMajor,
            connectedMajor: req.body.connectedMajor,
            admissionYear: req.body.admissionYear
        };
        try {
            const result = yield user_model_1.user.updateUser(userId, userData);
            res.send(result);
        }
        catch (err) {
            res.send(err);
        }
    });
}
/**
 * route: user 비밀번호 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function updateUserPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userId = req.params.userId;
        let userPw = req.body.userPw;
        let userNewPw = req.body.userNewPw;
        const getUserPw = yield user_model_1.user.getUser(userId);
        try {
            if (encryption_utli_1.encriptionPw.getHash(userPw) === getUserPw[0].userPw) {
                const userPw = encryption_utli_1.encriptionPw.getHash(userNewPw);
                const result = yield user_model_1.user.updateUserPassword(userId, userPw);
                res.send(result);
            }
            else {
                throw new Error('The password is incorrect');
            }
        }
        catch (err) {
            res.send(err.message);
        }
    });
}
/**
 * route: user 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userId = req.params.userId;
        try {
            const result = yield user_model_1.user.deleteUser(userId);
            res.send(result);
        }
        catch (err) {
            res.send(err);
        }
    });
}
exports.userRoutes = new UserRoutes();
//# sourceMappingURL=user.route.js.map