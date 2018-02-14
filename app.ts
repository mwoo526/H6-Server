import * as bodyParser from 'body-parser';
import * as express from 'express';
import { lectureRoutes } from './apis/lecture/route/lecture.route';
import { professorRoutes } from './apis/professor/route/professor.route';
import { signInRoutes } from './apis/sign/route/signIn.route';
import { signUpRoutes } from './apis/sign/route/signUp.route';
import { testRoutes } from './apis/test/route/test.route';
import { userRoutes } from './apis/user/route/user.route';
import { userValidationRoutes } from './apis/userValidation/route/userValidation.route';

export class Server {
	/** app 에 대한 타입 설정 */
	public app: express.Application;

	constructor() {
		/** express 설정을 위한 express 선언 */
		this.app = express();
		/** bodyParser 선언 */
		this.app.use(bodyParser.urlencoded({extended: false}));
		this.app.use(bodyParser.json());
		/** 라우터 추가 */
		this.app.use(testRoutes.testRouter);
		this.app.use(userRoutes.userRouter);
		this.app.use(signUpRoutes.signUpRouter);
		this.app.use(signInRoutes.signInRouter);
		this.app.use(professorRoutes.professorRouter);
		this.app.use(lectureRoutes.lectureRouter);
		this.app.use(userValidationRoutes.userValidationRouter);
		/** Not Found */
		this.app.use((req: express.Request, res: express.Response, next: Function) => {
			/**
			 *  Error 이라는 정의가 있지만 Error 에는 status 라는 정의가 없어서 any 설정
			 */
			const err: any = new Error('not_found');
			err.status = 404;
			next(err);
		});
		/** 에러 처리 */
		this.app.use((err: any, req: express.Request, res: express.Response) => {
			err.status = err.status || 500;
			console.error(`error on request ${req.method} | ${req.url} | ${err.status}`);
			console.error(err.stack || `${err.message}`);
			err.message = err.status == 500 ? 'Something bad happened.' : err.message;
			res.status(err.status).send(err.message);
		});
	}
}
