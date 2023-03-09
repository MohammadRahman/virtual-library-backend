import { config } from './utils/config'
import { createServer } from './utils/createServer'
import { connectDatabase } from './utils/dbConfig'
import { log } from './utils/logger'
import { startPrometheousServer } from './utils/metrics'
import fs from 'fs'
const file = fs.readFileSync('../AF15C78F6DF912CC029BEF4A5A8FFEFE.txt')
function startServer() {
    const server = createServer()
    const port = config.PORT
    const HOST = '0.0.0.0';
    server.listen(port,HOST, async() => {
        log.info(`server on ${port}`)
        await connectDatabase()
        startPrometheousServer()
    })
}

startServer()