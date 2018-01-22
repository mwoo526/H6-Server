export class ProfessorResource {
	private professorName;
	private professorDepartment;
	private professorAddress;
	private professorPhone;
	private professorEmail;

	constructor(professorData) {
		this.setProfessorName(professorData.professorName);
		this.setProfessorDepartment(professorData.professorDepartment);
		this.setProfessorAddress(professorData.professorAddress);
		this.setProfessorPhone(professorData.professorPhone);
		this.setProfessorEmail(professorData.professorEmail);
	}

	public getProfessorName() {
		return this.professorName;
	}
	public setProfessorName(professorName) {
		this.professorName = professorName;
	}

	public getProfessorDepartment() {
		return this.professorDepartment;
	}
	public setProfessorDepartment(professorDepartment) {
		this.professorDepartment = professorDepartment;
	}

	public getProfessorAddress() {
		return this.professorAddress;
	}
	public setProfessorAddress(professorAddress) {
		this.professorAddress = professorAddress;
	}

	public getProfessorPhone() {
		return this.professorPhone;
	}
	public setProfessorPhone(professorPhone) {
		this.professorPhone = professorPhone;
	}

	public getProfessorEmail() {
		return this.professorEmail;
	}
	public setProfessorEmail(professorEmail) {
		this.professorEmail = professorEmail;
	}

	getProfessor() {
		let professorResource: object = {
			professorName: this.getProfessorName(),
			professorDepartment: this.getProfessorDepartment(),
			professorAddress: this.getProfessorAddress(),
			professorPhone: this.getProfessorPhone(),
			professorEmail: this.getProfessorEmail()
		};
		return professorResource;
	}
}