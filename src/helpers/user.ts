import jwt from 'jsonwebtoken'
import { config } from '../utils/config'

export function generateToken(payload: string) {
    return jwt.sign({payload}, config.JWT_SECRET, {expiresIn:'1h'})
}
export function veryfyToken(payload:string) {
    return jwt.verify(payload, config.JWT_SECRET)
}