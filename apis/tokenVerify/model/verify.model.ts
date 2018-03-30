import * as jwt from 'Jsonwebtoken';
import {jwtToken} from '../../packages/utils/secret.util';

export function verifyUser(token : any) : Promise <any>{
    return new Promise(async (resolve,reject)=>{
        await jwt.verfiy(token,jwtToken.secret,(err,decoded)=>{
            if(err) reject(err);
            resolve(decoded);
        })
    })
}