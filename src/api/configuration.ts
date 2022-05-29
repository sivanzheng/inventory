import { createConfiguration, hooks } from '@midwayjs/hooks'
import * as Koa from '@midwayjs/koa'
import * as orm from '@midwayjs/orm'
import * as dotenv from 'dotenv'
import jwtMiddleware from './middleware/jwt.middleware'

dotenv.config()

console.log('\n')
console.log('Current environment:', process.env.MIDWAY_SERVER_ENV)
console.log('Ready to connect: ',  process.env.HOST.slice(0, 12), ':', process.env.PORT)

/**
 * setup midway server
 */
export default createConfiguration({
    imports: [
        Koa,
        orm,
        hooks({
            middleware: [jwtMiddleware]
        })
    ],
    importConfigs: [
        {
            default:
            {
                keys: 'session_keys',
                orm: {
                    type: 'mysql',
                    host: process.env.HOST,
                    port: process.env.PORT,
                    username: process.env.USERNAME,
                    password: process.env.PASSWORD,
                    database: 'inventory',
                    synchronize: false,
                    logging: false,
                }
            }
        },

    ]
})
