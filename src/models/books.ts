import mongoose from "mongoose";
import { UserDocument, USER_MODEL } from "./user";

interface BookInput{
    name: string,
    author: UserDocument['_id'],
    readBy: UserDocument['_id']
}

interface BookDocument extends BookInput, mongoose.Document{
    createdAt: Date,
    updatedAt: Date,
    readCounts: number,
}
const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: USER_MODEL
    },
    readCounts: {
        type: Number,
        default: 0
    },
    readBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:USER_MODEL
    }]
},{timestamps: true})

export const BOOK_MODEL = mongoose.model<BookDocument>('books', bookSchema)