import {pwdhash} from "../../encription/pwdhash";

export class RegisterVo{
    private userIndex;
    private userId;
    private userPw;
    private userNickName;
    private major;
    private minor;
    private doubleMajor;
    private connectedMajor;
    private admissionYear;
    private createdAt;
    private updatedAt;

    constructor(registerData){
        this.userId = registerData.userId;
        this.userPw = pwdhash.getHash(registerData.userPw);
        this.userNickName = registerData.userNickName;
        this.major = registerData.major;
        this.minor = registerData.minor;
        this.doubleMajor = registerData.doubleMajor;
        this.connectedMajor = registerData.connectedMajor;
        this.admissionYear = registerData.admissionYear;
    }

    createRegister(){
        let obj = {
            userId:this.userId,
            userPw:this.userPw,
            userNickName:this.userNickName,
            major:this.major,
            minor:this.minor,
            doubleMajor:this.doubleMajor,
            connectedMajor:this.connectedMajor,
            admissionYear:this.admissionYear
        }
        return obj;
    }
}