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
const signIn_model_1 = require("../model/signIn.model");
class SignInRoutes {
    constructor() {
        this.signInRouter = express.Router();
        this.router();
    }
    router() {
        this.signInRouter.post('/signIn', getUser);
    }
}
exports.SignInRoutes = SignInRoutes;
/**
 * route: 로그인
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let result;
            const resultUser = yield signIn_model_1.signIn.getUser(req.body);
            result = {
                success: true,
                statusCode: 200,
                message: 'logged in successfully',
                token: resultUser
            };
            res.json(result);
        }
        catch (err) {
            res.send(err);
        }
    });
}
exports.signInRoutes = new SignInRoutes();
//# sourceMappingURL=signIn.route.js.map