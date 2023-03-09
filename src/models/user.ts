import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import { config } from "../utils/config";

enum UserRole{
    AUTHOR = 'author',
    GUEST = 'guest'
}
export interface UserInputs{
    name: string
    email: string,
    password:string
}
export interface UserDocument extends UserInputs, mongoose.Document{
    createdAt: Date,
    updatedAt: Date,
    role: string[]
    comparePassword(password: string): Promise<boolean>
}
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: [String],
        enum: UserRole,
        default: UserRole.GUEST
    }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    const salt = await bcrypt.genSalt(config.SALT_ROUND)
    this.password = await bcrypt.hash(this.password, salt)
    return next()
})
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password).catch(e => false)
}

export const USER_MODEL = mongoose.model<UserDocument>('users',userSchema)