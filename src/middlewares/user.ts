import { NextFunction, Request,Response } from "express";
import { veryfyToken } from "../helpers/user";
import { USER_MODEL } from "../models/user";
import { findOneUserByEmail } from "../service/user";

export async function requireSignIn(req:Request,res:Response, next:NextFunction) {
    let token = req.headers.authorization
    if (!token) {
        return res.status(403).json({
            message:'un-authorised'
        })
    }
    token = token.split(" ")[1]
try {
    const user = veryfyToken(token) as { payload: string }

    req.user = user.payload
    return next()
} catch (error) {
    return res.status(403).json({
        message:'un-authorised'
    })
 }
}
export async function isAuthor(req:Request,res:Response,next:NextFunction) {
    try {
        const user = await findOneUserByEmail(req.user)
        if (!user?.role.includes('author')) {
            return res.status(403).json({
                message:'un-authorised'
            })
        }
        next()
    } catch (error) {
        return res.status(403).json({
            message: 'un-authorised'
        })
    }
}
export async function isReader(req:Request,res:Response,next:NextFunction) {
    try {
        const user = await findOneUserByEmail(req.user)
        if (!user?.role.includes('guest')) {
            return res.status(403).json({
                message:'un-authorised'
            })
        }
        next()
    } catch (error) {
        return res.status(403).json({
            message: 'un-authorised'
        })
    }
}