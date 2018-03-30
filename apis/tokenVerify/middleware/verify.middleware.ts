import * as express from 'express';
import {verifyUser} from "../model/verify.model";

export async function verify(req:express.Request,res:express.Response,next:Function){
    let token = req.headers['x-access-token'];
    if(!token){
        return res.status(403).json({
            success:false,
            message:'not logged in'
        })
    }
    try{
        const result:any = await verifyUser(token);
        res.json({
            success:true,
            info:result
        })
    } catch(err){
        res.status(403).json({
            success:false,
            message:err.message
        })
    }
    next();
}
