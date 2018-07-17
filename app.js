"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const admissionYear_route_1 = require("./apis/admissionYear/route/admissionYear.route");
const lecture_route_1 = require("./apis/lecture/route/lecture.route");
const lectureInfo_route_1 = require("./apis/lecture/route/lectureInfo.route");
const lectureReply_route_1 = require("./apis/lecture/route/lectureReply.route");
const professor_route_1 = require("./apis/professor/route/professor.route");
const signIn_route_1 = require("./apis/sign/route/signIn.route");
const signUp_route_1 = require("./apis/sign/route/signUp.route");
const terms_route_1 = require("./apis/terms/route/terms.route");
const test_route_1 = require("./apis/test/route/test.route");
const user_route_1 = require("./apis/user/route/user.route");
const track_route_1 = require("./apis/track/route/track.route");
const userValidation_route_1 = require("./apis/userValidation/route/userValidation.route");
const version_route_1 = require("./apis/version/route/version.route");
const vote_route_1 = require("./apis/vote/route/vote.route");
const error_middleware_1 = require("./middlewares/error.middleware");
const tokenVerify_middleware_1 = require("./middlewares/tokenVerify.middleware");
const voteScheduler_1 = require("./schedulers/vote/voteScheduler");
class Server {
    constructor() {
        /** express 설정을 위한 express 선언 */
        this.app = express();
        voteScheduler_1.voteScheduler.task();
        this.app.get('/console', function (req, res) {
            res.send('H6-server Running');
        });
        /** bodyParser 선언 */
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        /** 라우터 추가 */
        this.app.use(signUp_route_1.signUpRoutes.signUpRouter);
        this.app.use(signIn_route_1.signInRoutes.signInRouter);
        this.app.use(terms_route_1.termsRoutes.termsRouter);
        this.app.use(track_route_1.trackRoutes.trackRouter);
        this.app.use(admissionYear_route_1.admissionRoutes.admissionYearRouter);
        this.app.use(userValidation_route_1.userValidationRoutes.userValidationRouter);
        /** 라우터 토큰 검증 */
        this.app.use(tokenVerify_middleware_1.verify);
        /** 라우터 추가 */
        this.app.use(vote_route_1.voteRoutes.voteRouter);
        this.app.use(test_route_1.testRoutes.testRouter);
        this.app.use(user_route_1.userRoutes.userRouter);
        this.app.use(professor_route_1.professorRoutes.professorRouter);
        this.app.use(lecture_route_1.lectureRoutes.lectureRouter);
        this.app.use(lectureInfo_route_1.lectureInfoRoutes.lectureInfoRouter);
        this.app.use(lectureReply_route_1.lectureReplyRoutes.lectureReplyRouter);
        this.app.use(version_route_1.versionRoutes.versionRouter);
        /** 라우터 오류 처리 */
        this.app.use(error_middleware_1.notFoundError);
        this.app.use(error_middleware_1.serverError);
    }
}
exports.Server = Server;
//# sourceMappingURL=app.js.map