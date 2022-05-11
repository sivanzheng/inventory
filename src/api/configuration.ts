import { createConfiguration, hooks } from '@midwayjs/hooks'
import * as Koa from '@midwayjs/koa'
import * as orm from '@midwayjs/orm'
import * as dotenv from 'dotenv'
import JWT from './middleware/JWT'

dotenv.config()

/**
 * setup midway server
 */
export default createConfiguration({
    imports: [
        Koa,
        orm,
        hooks({
            middleware: [JWT]
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
