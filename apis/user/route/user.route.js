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
const user_resource_1 = require("../../../resources/user.resource");
const lectureReply_model_1 = require("../../lecture/model/lectureReply.model");
const user_model_1 = require("../model/user.model");
class UserRoutes {
    constructor() {
        this.userRouter = express.Router();
        this.router();
    }
    router() {
        this.userRouter.post('/users', createUser);
        this.userRouter.get('/users', pageListUser);
        this.userRouter.get('/users/userId/:userId', getUser);
        this.userRouter.put('/users/userId/:userId', updateUser);
        this.userRouter.put('/users/userId/:userId/password', updateUserPassword);
        this.userRouter.delete('/users/userId/:userId', deleteUser);
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
 * route: user page 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function pageListUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let page = parseInt(req.query.page);
            let count = parseInt(req.query.count);
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
            userEmail: req.body.userEmail,
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
        try {
            yield user_model_1.user.getUserPassword(userId, userPw);
            yield user_model_1.user.updateUserPassword(userId, userNewPw);
            res.send({
                success: true,
                statusCode: 200,
                message: 'updateUserPassword: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'The password is incorrect':
                    res.send({
                        success: false,
                        statusCode: 404,
                        message: 'getUser: 40401'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getUser: 50000'
                    });
                    break;
            }
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
            const resultUser = yield user_model_1.user.getUser(userId);
            yield lectureReply_model_1.lectureReply.deleteLectureReplyByUserIndex(resultUser[0].userIndex);
            yield user_model_1.user.deleteUser(userId);
            res.send({
                success: true,
                statusCode: 200,
                message: 'deleteUser: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'deleteUser: 50000'
                    });
                    break;
            }
        }
    });
}
exports.userRoutes = new UserRoutes();
//# sourceMappingURL=user.route.js.map