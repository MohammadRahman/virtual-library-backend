import express from 'express'
import client from 'prom-client'
import { log } from './logger'

const app = express()



export const apiResponseTimeHistogram = new client.Histogram({
    name: 'api_response_time_duration_seconds',
    help: 'API RESPONSE TIME IN SECONDS',
    labelNames: ['method','route','status_code']
})
export const databaseResponseTimeHistogram = new client.Histogram({
    name: 'database_response_time_duration_seconds',
    help: 'DATABASE RESPONSE TIME IN SECONDS',
    labelNames:['operation','success']
})
export function startPrometheousServer() {
    const collectDefaultMet = client.collectDefaultMetrics

    collectDefaultMet()
    app.get('/metrics', async (req, res) => {
        res.set('Content-Type', client.register.contentType)
        return res.send(await client.register.metrics())
    })
    app.listen(3008, () => {
        log.info('Metrics server started at http://localhost:9120')
    })
}