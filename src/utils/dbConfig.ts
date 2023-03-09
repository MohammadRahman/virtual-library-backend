import mongoose from 'mongoose'
import { config } from './config'
import { log } from './logger'


export async function connectDatabase() {
    try {
        const uri = config.DATABASE_URL
       const con= await mongoose.connect(uri)
        log.info('database connected')
    } catch (error) {
        log.error(error)
    }
}