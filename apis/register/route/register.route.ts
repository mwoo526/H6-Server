import * as express from 'express';
import {register} from '..//model/register.model';
import {RegisterVo} from "../vo/register.vo";

export class RegisterRoutes {
    public registerRouter: express.Router = express.Router();

    constructor(){
        this.router();
    }

    public router() {
        this.registerRouter.post('/register', createUser);
    }
}

/**
 * 라우트: 회원 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createUser(req, res): Promise<void> {
    let userData = new RegisterVo(req.body);
    try {
        const result: any = await register.createUser(userData.createRegister());
        res.send(result);
    } catch (err) {
        res.send(err.message);
    }
}

export const registerRoutes: RegisterRoutes = new RegisterRoutes();