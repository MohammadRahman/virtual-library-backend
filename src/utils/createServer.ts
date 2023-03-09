import express,{Request,Response} from 'express'
import cors from 'cors'
import { routes } from '../router'
import { rateLimit } from 'express-rate-limit'
import responseTime from 'response-time'
import { apiResponseTimeHistogram } from './metrics'


export function createServer() {
    const app = express()

    const limiter = rateLimit({
        windowMs: 1 * 60 * 1000, // 1 minutes
        max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false,
    })
    app.use(express.json())
    app.use(cors())
    app.use(limiter)
    app.use(responseTime((req: Request, res: Response, time: number) => {

        if (req.originalUrl) {
            apiResponseTimeHistogram.observe({
                method: req.method,
                route: req.originalUrl,
                status_code: res.statusCode
            },time*1000)
        }
    }))
    
    routes(app)
    return app;
}