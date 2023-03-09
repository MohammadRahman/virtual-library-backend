import { config } from './utils/config'
import { createServer } from './utils/createServer'
import { connectDatabase } from './utils/dbConfig'
import { log } from './utils/logger'
import { startPrometheousServer } from './utils/metrics'

function startServer() {
    const server = createServer()
const port = config.PORT
    server.listen(port, async() => {
        log.info(`server on ${port}`)
        await connectDatabase()
        startPrometheousServer()
    })
}

startServer()