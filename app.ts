import * as bodyParser from 'body-parser';
import * as express from 'express';
import { lectureRoutes } from './apis/lecture/route/lecture.route';
import { lectureInfoRoutes } from './apis/lecture/route/lectureInfo.route';
import { lectureReplyRoutes } from './apis/lecture/route/lectureReply.route';
import { professorRoutes } from './apis/professor/route/professor.route';
import { signInRoutes } from './apis/sign/route/signIn.route';
import { signUpRoutes } from './apis/sign/route/signUp.route';
import { testRoutes } from './apis/test/route/test.route';
import { userRoutes } from './apis/user/route/user.route';
import { userValidationRoutes } from './apis/userValidation/route/userValidation.route';
import { verify } from "./middleware/tokenVerify.middleware";
import { notFoundError } from "./middleware/error.middleware";
import { serverError } from "./middleware/error.middleware";

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
		this.app.use(lectureInfoRoutes.lectureInfoRouter);
		this.app.use(lectureReplyRoutes.lectureReplyRouter);
		this.app.use(userValidationRoutes.userValidationRouter);

		/*미들웨어 처리*/
		this.app.use(verify);
		this.app.use(notFoundError);
		this.app.use(serverError);
	}
}
