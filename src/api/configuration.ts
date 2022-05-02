import { createConfiguration, hooks } from '@midwayjs/hooks'
import { join } from 'path'
import * as Koa from '@midwayjs/koa'
import * as orm from '@midwayjs/orm'

/**
 * setup midway server
 */
export default createConfiguration({
  imports: [Koa, orm, hooks()],
  importConfigs: [
    { default: { keys: 'session_keys' } },
      join(__dirname, '../config/'),
  ],
})
