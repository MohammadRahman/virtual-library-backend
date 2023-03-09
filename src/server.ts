import { config } from './utils/config'
import { createServer } from './utils/createServer'
import { connectDatabase } from './utils/dbConfig'
import { log } from './utils/logger'
import { startPrometheousServer } from './utils/metrics'
import fs from 'fs'
import https from 'https'


const key = fs.readFileSync('private.key')
const cert = fs.readFileSync('certificate.crt')

const cred = {
    key,
    cert
}
function startServer() {
    const server = createServer()
    const port = config.PORT
    const HOST = '0.0.0.0';
    server.listen(port,HOST, async() => {
        log.info(`server on ${port}`)
        await connectDatabase()
        startPrometheousServer()
    })
    const httpsServer = https.createServer(cred, server)
    httpsServer.listen(8443)
}



startServer()