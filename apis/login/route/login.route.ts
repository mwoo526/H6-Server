import * as express from 'express';
import {login} from '../model/login.model';

export class LoginRoutes {
    public loginRouter: express.Router = express.Router();

    constructor(){
        this.router();
    }

    public router() {
        this.loginRouter.post('/login', loginUser);
    }
}

/**
 * 라우트: 회원 로그인
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function loginUser(req, res): Promise<void> {
    try {
        const result: any = await login.loginUser(req.body);
        res.send(result);
    } catch (err) {
        res.send(err.message);
    }
}

export const loginRoutes: LoginRoutes = new LoginRoutes();