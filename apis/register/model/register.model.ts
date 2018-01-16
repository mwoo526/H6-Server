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
    createRegister(registerVO: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await conn.query(`INSERT INTO users SET ?`, [registerVO], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(registerVO);
                }
            })
        })
    }
}
export const register:Register = new Register;