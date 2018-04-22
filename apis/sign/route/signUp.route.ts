import * as express from 'express';
import { UserResource } from '../../../resources/user.resource';
import { signUp } from '../model/signUp.model';

export class SignUpRoutes {
	public signUpRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.signUpRouter.post('/signUp', createUser);
	}
}

/**
 * route: 회원가입
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createUser(req, res): Promise<void> {
	let userResource = new UserResource(req.body);
	try {
		const result: any = await signUp.createUser(userResource.getSignUp());
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createUser: 2001'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createUser: 50000'
				});
				break;
		}
	}
}

export const signUpRoutes: SignUpRoutes = new SignUpRoutes();
