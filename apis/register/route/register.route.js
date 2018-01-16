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
const register_model_1 = require("..//model/register.model");
const register_vo_1 = require("../vo/register.vo");
class RegisterRoutes {
    constructor() {
        this.registerRouter = express.Router();
        this.router();
    }
    router() {
        this.registerRouter.post('/register', createRegister);
    }
}
exports.RegisterRoutes = RegisterRoutes;
/**
 * 라우트: 회원 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function createRegister(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let registerVO = new register_vo_1.RegisterVO(req.body);
        try {
            const result = yield register_model_1.register.createRegister(registerVO.getRegister());
            res.send(result);
        }
        catch (err) {
            res.send(err.message);
        }
    });
}
exports.registerRoutes = new RegisterRoutes();
//# sourceMappingURL=register.route.js.map