import * as mysql from 'mysql'
import {pwdhash} from "../../encription/pwdhash";

const conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'h6'
});
conn.connect();

class Login{
    /**
     * model: user 로그인
     * @param userData
     * @returns {Promise<any>}
     */
    loginUser(userData: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await conn.query(`SELECT * from users where userId=?`, [userData.userId], function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    let err={
                        message:'not exist ID'
                    }
                    if(rows.length===0){
                        reject(err);
                    }else{
                        if(rows[0].userPw===pwdhash.getHash(userData.userPw)){
                            resolve(rows);
                        }else{
                            err.message='password error';
                            reject(err);
                        }
                    }


                }
            })
        })
    }
}

export const login:Login = new Login();