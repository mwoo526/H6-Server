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
const chai_1 = require("chai");
const lectureReply_model_1 = require("./lectureReply.model");
describe('lectureReply 모델', () => {
    let testLectureReplyIndex;
    let testLectureInfoIndex;
    let testUserIndex;
    let testUserId;
    let testUserNickName;
    before(() => __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield lectureReply_model_1.lectureReply.createLectureReply({
                lectureInfoIndex: 1,
                userIndex: 9,
                semester: '17년도 2학기',
                homework: '보통',
                homeworkType: 1,
                testCount: 2,
                receivedGrade: 2,
                score: 4
            });
            /** validation 체크 */
            chai_1.expect(result).to.instanceof(Object);
            /** lectureReply lectureInfoIndex 조회 */
            const resultGetLectureReplyByLectureInfoIndex = yield lectureReply_model_1.lectureReply.getLectureReplyByLectureInfoIndex(1);
            /** validation 체크 */
            chai_1.expect(resultGetLectureReplyByLectureInfoIndex).to.instanceof(Array);
            /** lectureReply 칼럼 값 */
            const lectureReplyData = resultGetLectureReplyByLectureInfoIndex;
            testLectureReplyIndex = lectureReplyData[0].lectureReplyIndex;
            testLectureInfoIndex = lectureReplyData[0].lectureInfoIndex;
            testUserIndex = lectureReplyData[0].userIndex;
            testUserId = lectureReplyData[0].userId;
            testUserNickName = lectureReplyData[0].userNickName;
        }
        catch (err) {
            console.error('err', err);
        }
    }));
    after(() => __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield lectureReply_model_1.lectureReply.deleteLectureReply(testLectureReplyIndex);
            chai_1.expect(result).to.instanceof(Object);
        }
        catch (err) {
            console.error('err', err);
        }
    }));
    /** 테스트 용도로 사용 */
    // it('createLectureReply', async () => {
    // 	const result = await lectureReply.createLectureReply({
    // 		lectureInfoIndex: 1,
    // 		userIndex: 9,
    // 		semester: '17년도 2학기',
    // 		homework: '보통',
    // 		homeworkType: 1,
    // 		testCount: 2,
    // 		receivedGrade: 2,
    // 		score: 4
    // 	});
    // 	console.log(result);
    // 	expect(result).to.instanceof(Object);
    // });
    it('listLectureReply', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield lectureReply_model_1.lectureReply.listLectureReply();
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('pageListLectureReply', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield lectureReply_model_1.lectureReply.pageListLectureReply(1, 3);
        console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getLectureReplyByLectureReplyIndex', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield lectureReply_model_1.lectureReply.getLectureReplyByLectureReplyIndex(testLectureReplyIndex);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('pageGetLectureReplyByLectureReplyIndex', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield lectureReply_model_1.lectureReply.pageGetLectureReplyByLectureReplyIndex(testLectureReplyIndex, 1, 3);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getLectureReplyByLectureInfoIndex', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield lectureReply_model_1.lectureReply.getLectureReplyByLectureInfoIndex(testLectureInfoIndex);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('pageGetLectureReplyByLectureInfoIndex', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield lectureReply_model_1.lectureReply.pageGetLectureReplyByLectureInfoIndex(testLectureInfoIndex, 1, 3);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getLectureReplyUserIndex', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield lectureReply_model_1.lectureReply.getLectureReplyByUserIndex(testUserIndex);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('pageGetLectureReplyUserIndex', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield lectureReply_model_1.lectureReply.pageGetLectureReplyByUserIndex(testUserIndex, 1, 3);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getLectureReplyUserId', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield lectureReply_model_1.lectureReply.getLectureReplyByUserId(testUserId);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('pageGetLectureReplyByUserId', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield lectureReply_model_1.lectureReply.pageGetLectureReplyByUserId(testUserId, 1, 3);
        console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getLectureReplyByUserNickName', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield lectureReply_model_1.lectureReply.getLectureReplyByUserNickName(testUserNickName);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('pageGetLectureReplyByUserNickName', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield lectureReply_model_1.lectureReply.pageGetLectureReplyByUserNickName(testUserNickName, 1, 3);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('updateLectureReply', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield lectureReply_model_1.lectureReply.updateLectureReply(testLectureInfoIndex, {
            receivedGrade: 1,
            score: 1
        });
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    /** 테스트 용도로 사용 */
    // it('deleteLectureReply', async () => {
    // 	const result = await lectureReply.deleteLectureReply(2);
    // 	// console.log(result);
    // 	expect(result).to.instanceof(Object);
    // });
});
//# sourceMappingURL=lectureReply.model.spec.js.map