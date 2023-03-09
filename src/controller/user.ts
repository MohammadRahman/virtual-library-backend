import { Request,Response } from "express";
import { generateToken, veryfyToken } from "../helpers/user";
import { USER_MODEL } from "../models/user";
import { CreateUserInput, LoginUserInput } from "../schemas/user";
import { createUserService, findOneUserByEmail } from "../service/user";

export async function createUserHandler(req: Request<{}, {}, CreateUserInput['body']>, res: Response) {
    try {
        const user = await createUserService(req.body)
        return res.json(user)
    } catch (error:any) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: 'Eamil already exist!'
            })
        }
        return res.status(400).json({
            message: error
        })
    }
}

export async function createUserLoginHandler(req: Request<{}, {}, LoginUserInput['body']>,res:Response) {
    try {
        const { email, password } = req.body
        const user = await findOneUserByEmail(email)
        if (!user) {
            return res.status(400).json({
                message:'in-valid credentials'
            })
        }
        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            return res.status(400).json({
                error: 'invalid credentials'
            })
        }
        const token = generateToken(email)
        return res.json({
            token,
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            }
        })

    } catch (error:any) {
        return res.status(400).json({
            message: error,
            stack: error.stack
        })
    }
}

export async function beAnAuthor(req: Request, res: Response) {
    try {
        const user = await findOneUserByEmail(req.user)
        if (user?.role.includes('guest')) {
            const updateUseRole = await USER_MODEL.findOneAndUpdate({ email: user.email }, { role: ["author"] }, { new: true })
            return res.status(200).json({
                message: 'updated as author'
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}