"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LectureReplyResource {
    constructor(lectureReplyData) {
        this.setLectureInfoIndex(lectureReplyData.lectureInfoIndex);
        this.setUserIndex(lectureReplyData.userIndex);
        this.setSemester(lectureReplyData.semester);
        this.setHomework(lectureReplyData.homework);
        this.setHomeworkType(lectureReplyData.homeworkType);
        this.setTestCount(lectureReplyData.testCount);
        this.setReceivedGrade(lectureReplyData.receivedGrade);
        this.setScore(lectureReplyData.score);
    }
    getLectureInfoIndex() {
        return this.lectureInfoIndex;
    }
    setLectureInfoIndex(lectureInfoIndex) {
        this.lectureInfoIndex = lectureInfoIndex;
    }
    getUserIndex() {
        return this.userIndex;
    }
    setUserIndex(userIndex) {
        this.userIndex = userIndex;
    }
    getSemester() {
        return this.semester;
    }
    setSemester(semester) {
        this.semester = semester;
    }
    getHomework() {
        return this.homework;
    }
    setHomework(homework) {
        this.homework = homework;
    }
    getHomeworkType() {
        return this.homeworkType;
    }
    setHomeworkType(homeworkType) {
        this.homeworkType = homeworkType;
    }
    getTestCount() {
        return this.testCount;
    }
    setTestCount(testCount) {
        this.testCount = testCount;
    }
    getReceivedGrade() {
        return this.receivedGrade;
    }
    setReceivedGrade(receivedGrade) {
        this.receivedGrade = receivedGrade;
    }
    getScore() {
        return this.score;
    }
    setScore(score) {
        this.score = score;
    }
    getLectureReply() {
        let lectureReplyResource = {
            lectureInfoIndex: this.getLectureInfoIndex(),
            userIndex: this.getUserIndex(),
            semester: this.getSemester(),
            homework: this.getHomework(),
            homeworkType: this.getHomeworkType(),
            testCount: this.getTestCount(),
            receivedGrade: this.getReceivedGrade(),
            score: this.getScore()
        };
        return lectureReplyResource;
    }
}
exports.LectureReplyResource = LectureReplyResource;
//# sourceMappingURL=lectureReply.resource.js.map