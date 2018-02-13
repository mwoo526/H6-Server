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
const lecture_model_1 = require("./lecture.model");
describe('lecture 모델', () => {
    it('createLecture', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield lecture_model_1.lecture.createLecture({
            lectureCode: 'ABC',
            lectureName: 'Node.js',
            track: 'IT'
        });
        console.log(result);
        chai_1.expect(result).instanceof(Object);
    }));
    it('listLecture', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield lecture_model_1.lecture.listLecture();
        console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
});
//# sourceMappingURL=lecture.model.spec.js.map