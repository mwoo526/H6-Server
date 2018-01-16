import {pwdhash} from "../../encription/pwdhash";

export class RegisterVO{
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
        this.setUserId(registerData.userId);
        this.setUserPw(registerData.userPw);
        this.setUserNickName(registerData.userNickName);
        this.setMajor(registerData.major);
        this.setMinor(registerData.minor);
        this.setDoubleMajor(registerData.doubleMajor);
        this.setConnectedMajor(registerData.connectedMajor);
        this.setAdmissionYear(registerData.admissionYear);
    }

    public getUserIndex(){
        return this.userIndex;
    }
    public setUserIndex(index){
        this.userIndex=index;
    }

    public getUserId(){
        return this.userId;
    }
    public setUserId(id){
        this.userId=id;
    }

    public getUserPw(){
        return this.userPw;
    }
    public setUserPw(pw){
        this.userPw=pwdhash.getHash(pw);
    }

    public getUserNickName(){
        return this.userNickName;
    }
    public setUserNickName(nickname){
        this.userNickName=nickname;
    }

    public getMajor(){
        return this.major;
    }
    public setMajor(major){
        this.major=major;
    }

    public getMinor(){
        return this.minor;
    }
    public setMinor(minor){
        this.minor=minor;
    }

    public getDoubleMajor(){
        return this.doubleMajor;
    }
    public setDoubleMajor(doublemajor){
        this.doubleMajor=doublemajor;
    }

    public getConnectedMajor(){
        return this.connectedMajor;
    }
    public setConnectedMajor(connectedmajor){
        this.connectedMajor=connectedmajor;
    }

    public getAdmissionYaer(){
        return this.admissionYear;
    }
    public setAdmissionYear(adyear){
        this.admissionYear=adyear;
    }

    public getCreateAt(){
        return this.createdAt;
    }
    public setCreateAt(createat){
        this.createdAt = createat;
    }

    public getUpdatedAt(){
        return this.updatedAt;
    }
    public setUpdatedAt(updateat){
        this.updatedAt=updateat;
    }
    getRegister(){
        let obj = {
            userId:this.getUserId(),
            userPw:this.getUserPw(),
            userNickName:this.getUserNickName(),
            major:this.getMajor(),
            minor:this.getMinor(),
            doubleMajor:this.getDoubleMajor(),
            connectedMajor:this.getConnectedMajor(),
            admissionYear:this.getAdmissionYaer()
        }
        return obj;
    }
}