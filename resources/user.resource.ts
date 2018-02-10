import { encriptionPw } from '../packages/utils/encryption.utli';

export class UserResource {
	private userId;
	private userPw;
	private userNickName;
	private email;
	private major;
	private minor;
	private doubleMajor;
	private connectedMajor;
	private admissionYear;

	constructor(signUpData){
		this.setUserId(signUpData.userId);
		this.setUserPw(signUpData.userPw);
		this.setUserNickName(signUpData.userNickName);
		this.setEmail(signUpData.email);
		this.setMajor(signUpData.major);
		this.setMinor(signUpData.minor);
		this.setDoubleMajor(signUpData.doubleMajor);
		this.setConnectedMajor(signUpData.connectedMajor);
		this.setAdmissionYear(signUpData.admissionYear);
	}

	public getUserId(){
		return this.userId;
	}
	public setUserId(userId){
		this.userId = userId;
	}

	public getUserPw(){
		return this.userPw;
	}
	public setUserPw(userPw){
		this.userPw = encriptionPw.getHash(userPw);
	}

	public getUserNickName(){
		return this.userNickName;
	}
	public setUserNickName(userNickName){
		this.userNickName = userNickName;
	}

	public getEmail(){
		return this.email;
	}
	public setEmail(email){
		this.email = email;
	}

	public getMajor(){
		return this.major;
	}
	public setMajor(major){
		this.major = major;
	}

	public getMinor(){
		return this.minor;
	}
	public setMinor(minor){
		this.minor = minor;
	}

	public getDoubleMajor(){
		return this.doubleMajor;
	}
	public setDoubleMajor(doubleMajor){
		this.doubleMajor = doubleMajor;
	}

	public getConnectedMajor(){
		return this.connectedMajor;
	}
	public setConnectedMajor(connectedMajor){
		this.connectedMajor = connectedMajor;
	}

	public getAdmissionYear(){
		return this.admissionYear;
	}
	public setAdmissionYear(admissionYear){
		this.admissionYear = admissionYear;
	}

	getSignUp(){
		let userResource = {
			userId: this.getUserId(),
			userPw: this.getUserPw(),
			userNickName: this.getUserNickName(),
			email: this.getEmail(),
			major: this.getMajor(),
			minor: this.getMinor(),
			doubleMajor: this.getDoubleMajor(),
			connectedMajor: this.getConnectedMajor(),
			admissionYear: this.getAdmissionYear()
		};
		return userResource;
	}
}