import { Request,Response } from "express";
import { BOOK_MODEL } from "../models/books";
import { findOneUserByEmail } from "../service/user";
import { redisClient } from "../utils/redisClient";

export async function createNewBookHandler(req: Request, res: Response) {
    try {
        const user = await findOneUserByEmail(req.user)

        const book = await BOOK_MODEL.create({ author: user?._id, ...req.body})
        return res.status(201).json({
            message: 'success',
            book
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

export async function updateCountAndStoreUserId(req: Request, res: Response) {
    try {
        const book = await BOOK_MODEL.findOne({ _id: req.params.id })
        const user = await findOneUserByEmail(req.user)
        if (book) {
            const updateBookAttrs = await BOOK_MODEL.findOneAndUpdate({ name: book.name }, { readCounts: book.readCounts + 1, readBy: user?._id }, { new: true }) 
            return res.status(200).json({
                message: 'ok',
                updateBookAttrs
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

export async function getBookListsHandler(req: Request, res: Response) {
    try {
        // const redis = await redisClient()
        // let cachedData = await redis.get('lists')
        
        // if (cachedData) {
        //     console.log("cached data")
        //     return res.json(JSON.parse(cachedData))  
        // }
        const books = await BOOK_MODEL.find({}).populate('author', "name").sort({createdAt: -1})
        if (books.length === 0) {
            return res.status(200).json({
                message: 'No books available'
            })
        }
        // redis.set('lists', JSON.stringify(books), 'EX', 30)
        return res.status(200).json({
            message: 'ok',
            source:'API',
            books
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}
export async function getMyBooks(req:Request,res:Response) {
    try {
        const user = await findOneUserByEmail(req.user)
        const books = await BOOK_MODEL.find({ author: user?._id })
        return res.status(200).json({
            message: 'ok',
            books
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}