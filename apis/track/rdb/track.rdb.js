"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, "__esModule", {value: true});
const chai_1 = require("chai");
const track_model_1 = require("../model/track.model");
describe('track 모델', () => {
  let testTrackName = [];
  testTrackName = [
    '산업경영공학과',
    'IT응용시스템공학과',
    '컴퓨터공학과',
    '기계시스템공학과'
  ];
  it('createTrack', () => __awaiter(this, void 0, void 0, function* () {
    for (let i = 0; i < testTrackName.length; i++) {
      const result = yield track_model_1.track.createTrack({
        trackName: testTrackName[i]
      });
      // console.log(result);
      chai_1.expect(result).instanceof(Object);
    }
  }));
  it('deleteTrack', () => __awaiter(this, void 0, void 0, function* () {
    for (let i = 0; i < testTrackName.length; i++) {
      const result = yield track_model_1.track.deleteTrack(testTrackName[i]);
      // console.log(result);
      chai_1.expect(result).instanceof(Object);
    }
  }));
});
//# sourceMappingURL=track.rdb.js.map