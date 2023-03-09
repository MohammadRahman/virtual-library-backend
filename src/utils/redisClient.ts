import redis from "ioredis";

export async function redisClient() {

    const client = redis.createClient()

    return client;
}