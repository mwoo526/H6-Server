import * as express from 'express';
import {register} from '..//model/register.model';
import {RegisterVO} from "../vo/register.vo";

export class RegisterRoutes {
    public registerRouter: express.Router = express.Router();

    constructor(){
        this.router();
    }

    public router() {
        this.registerRouter.post('/register', createRegister);
    }
}

/**
 * 라우트: 회원 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createRegister(req, res): Promise<void> {
    let registerVO = new RegisterVO(req.body);
    try {
        const result: any = await register.createRegister(registerVO.getRegister());
        res.send(result);
    } catch (err) {
        res.send(err.message);
    }
}

export const registerRoutes: RegisterRoutes = new RegisterRoutes();