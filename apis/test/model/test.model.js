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
let nameArray = [];

class Test {
  constructor() {
  }

  createName(name) {
    let result = {
      name: name
    };
    nameArray.push(result);
    return nameArray;
  }

  listName() {
    return nameArray;
  }

  getName(name) {
    for (let i = 0; i < nameArray.length; i++) {
      if (nameArray[i].name === name) {
        return nameArray[i];
      }
    }
  }

  updateName(name, chaneName) {
    for (let i = 0; i < nameArray.length; i++) {
      if (nameArray[i].name === name) {
        nameArray[i].name = chaneName;
        return nameArray[i];
      }
    }
  }

  deleteName(name) {
    return __awaiter(this, void 0, void 0, function* () {
      for (let i = 0; i < nameArray.length; i++) {
        if (nameArray[i].name === name) {
          yield nameArray.splice(i, 1);
          return nameArray[i];
        }
      }
    });
  }
}

exports.Test = Test;
exports.test = new Test();
//# sourceMappingURL=test.model.js.map