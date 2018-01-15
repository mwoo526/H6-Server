import * as mysql from 'mysql';

const conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'h6'
});
conn.connect();

class Register{
    /**
     * model: user 생성(가입)
     * @param userData
     * @returns {Promise<any>}
     */
    createUser(userData: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await conn.query(`INSERT INTO users SET ?`, [userData], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(userData);
                }
            })
        })
    }
}
export const register:Register = new Register;