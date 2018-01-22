"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProfessorResource {
    constructor(professorData) {
        this.setProfessorName(professorData.professorName);
        this.setProfessorDepartment(professorData.professorDepartment);
        this.setProfessorAddress(professorData.professorAddress);
        this.setProfessorPhone(professorData.professorPhone);
        this.setProfessorEmail(professorData.professorEmail);
    }
    getProfessorName() {
        return this.professorName;
    }
    setProfessorName(professorName) {
        this.professorName = professorName;
    }
    getProfessorDepartment() {
        return this.professorDepartment;
    }
    setProfessorDepartment(professorDepartment) {
        this.professorDepartment = professorDepartment;
    }
    getProfessorAddress() {
        return this.professorAddress;
    }
    setProfessorAddress(professorAddress) {
        this.professorAddress = professorAddress;
    }
    getProfessorPhone() {
        return this.professorPhone;
    }
    setProfessorPhone(professorPhone) {
        this.professorPhone = professorPhone;
    }
    getProfessorEmail() {
        return this.professorEmail;
    }
    setProfessorEmail(professorEmail) {
        this.professorEmail = professorEmail;
    }
    getProfessor() {
        let professorResource = {
            professorName: this.getProfessorName(),
            professorDepartment: this.getProfessorDepartment(),
            professorAddress: this.getProfessorAddress(),
            professorPhone: this.getProfessorPhone(),
            professorEmail: this.getProfessorEmail()
        };
        return professorResource;
    }
}
exports.ProfessorResource = ProfessorResource;
//# sourceMappingURL=professorResource.js.map