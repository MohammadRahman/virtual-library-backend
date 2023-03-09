import { envSchema } from 'env-schema'
import {Type, Static} from '@sinclair/typebox'

const schema = Type.Object({
    PORT: Type.Number({
        default: process.env.PORT
    }),
    DATABASE_URL: Type.String({
        default: process.env.DATABASE_URL
    }),
    SALT_ROUND: Type.Number({
        default: process.env.SALT_ROUND
    }),
    JWT_SECRET: Type.String({
        default: process.env.JWT_SECRET
    })
})
type Env = Static<typeof schema>

export const config = envSchema<Env>({
    dotenv: true,
    schema
})
