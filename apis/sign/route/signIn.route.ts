import * as express from 'express';
import { signIn } from '../model/signIn.model';

export class SignInRoutes {
	public signInRouter: express.Router = express.Router();

	constructor() {
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
		let result: any;
		const resultUser: any = await signIn.getUser(req.body);
		result = {
			success: true,
			statusCode: 200,
			message: 'logIn succeed',
			token: resultUser
		};
		res.json(result);
	} catch (err) {
		res.send(err);
	}
}

export const signInRoutes: SignInRoutes = new SignInRoutes();
