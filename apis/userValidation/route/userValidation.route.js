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
const inviteCode_util_1 = require("../../../packages/utils/inviteCode.util");
const user_model_1 = require("../../user/model/user.model");
const userValidation_model_1 = require("../model/userValidation.model");
class UserValidationRoutes {
    constructor() {
        this.userValidationRouter = express.Router();
        this.router();
    }
    router() {
        this.userValidationRouter.post('/userValidation/sendValidationCode/:userId', sendValidationCode);
        this.userValidationRouter.post('/userValidation/checkValidationCode/:userId', checkValidationCode);
    }
}
exports.UserValidationRoutes = UserValidationRoutes;
function sendValidationCode(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.params.userId;
            const userData = yield user_model_1.user.getUser(userId);
            const email = userData[0].email;
            const validationCode = yield String(inviteCode_util_1.getRandomInt());
            const result = yield userValidation_model_1.userValidation.createValidationCode(userId, email, validationCode);
            res.send(result);
        }
        catch (err) {
            res.send(err);
        }
    });
}
function checkValidationCode(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.userId;
        const validationCode = req.body.validationCode;
        const userData = yield user_model_1.user.getUser(userId);
        try {
            const result = yield userValidation_model_1.userValidation.checkValidationCode(userId, userData, validationCode);
            res.send(result);
        }
        catch (err) {
            res.send(err);
        }
    });
}
exports.userValidationRoutes = new UserValidationRoutes();
//# sourceMappingURL=userValidation.route.js.map