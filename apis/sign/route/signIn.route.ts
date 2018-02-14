import * as express from 'express';
import { signIn } from '../model/signIn.model';

export class SignInRoutes {
	public signInRouter: express.Router = express.Router();

	constructor(){
		this.router();
	}

	public router() {
		this.signInRouter.post('/signIn', getUser);
	}
}

/**
 * route: 로그인
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getUser(req, res): Promise<void> {
	try {
		const result: any = await signIn.getUser(req.body);
		res.send(result);
	} catch (err) {
		res.send(err);
	}
}

export const signInRoutes: SignInRoutes = new SignInRoutes();
