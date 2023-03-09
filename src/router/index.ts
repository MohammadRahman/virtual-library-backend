import { Express, Request, Response } from 'express'
import { createNewBookHandler, getBookListsHandler, updateCountAndStoreUserId, getMyBooks } from '../controller/book'
import { beAnAuthor, createUserHandler, createUserLoginHandler } from '../controller/user'
import { isAuthor, isReader, requireSignIn } from '../middlewares/user'
import { createUserSchema, loginUserSchema } from '../schemas/user'
import { validate } from '../utils/schemaValidate'

export function routes(app: Express) {
    // !API Working
    app.get('/api/healthcheck', (req: Request, res: Response) => {
        res.sendStatus(200)
    }),
        // !ssl verification
        app.get("/.well-known/pki-validation/AF15C78F6DF912CC029BEF4A5A8FFEFE.txt", (req: Request, res: Response) => {
            res.sendFile('../../AF15C78F6DF912CC029BEF4A5A8FFEFE.txt')
        })
    // ! User create/login
    app.post('/api/user/create', validate(createUserSchema), createUserHandler)
    app.post('/api/user/login', validate(loginUserSchema), createUserLoginHandler)
    app.put('/api/user/update', requireSignIn, beAnAuthor)
    
    //! protected route check
    app.get('/api/books', requireSignIn, (req: Request, res: Response) => {
        res.sendStatus(200)
    })
    // !Book routes
    app.post('/api/create/book', requireSignIn, isAuthor, createNewBookHandler)
    app.put('/api/update/book/:id', requireSignIn, updateCountAndStoreUserId)
    app.get('/api/get/books', requireSignIn, isReader, getBookListsHandler)
    app.get('/api/get/my/books', requireSignIn, isAuthor, getMyBooks)
}