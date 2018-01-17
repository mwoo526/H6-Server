import { mysqlResource } from '../../../resource/mysql.resource';


const conn = mysqlResource.conn;

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