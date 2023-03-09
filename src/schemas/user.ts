import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
    body: object({
        name: string({ required_error: 'Name is required' }).min(1, 'Name can not be empty'),
        email: string({ required_error: 'Email is required' }).email('Enter a valid email'),
        password: string({ required_error: 'Password is required' }).min(5, 'too short, 5 chars minimum')
    })

})
export const loginUserSchema = object({
    body: object({
        email: string({ required_error: 'Email is required' }).email('Enter a valid email'),
        password: string({ required_error: 'Password is required' }).min(5, 'too short, 5 chars minimum')
    })

})
export type CreateUserInput = TypeOf<typeof createUserSchema>
export type LoginUserInput = TypeOf<typeof loginUserSchema>