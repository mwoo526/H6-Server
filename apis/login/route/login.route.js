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
const login_model_1 = require("../model/login.model");
class LoginRoutes {
    constructor() {
        this.loginRouter = express.Router();
        this.router();
    }
    router() {
        this.loginRouter.post('/login', loginUser);
    }
}
exports.LoginRoutes = LoginRoutes;
/**
 * 라우트: 회원 로그인
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield login_model_1.login.loginUser(req.body);
            res.send(result);
        }
        catch (err) {
            res.send(err.message);
        }
    });
}
exports.loginRoutes = new LoginRoutes();
//# sourceMappingURL=login.route.js.map