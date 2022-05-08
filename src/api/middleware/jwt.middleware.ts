
import * as passport from 'passport'
import { Context } from '@midwayjs/koa'
import { useContext } from '@midwayjs/hooks'
import { Middleware } from '@midwayjs/decorator'
import { PassportMiddleware } from '@midwayjs/passport'
import { JwtStrategy } from '@src/api/stratrgy/jwt.strategy'

@Middleware()
export default class JwtPassportMiddleware extends PassportMiddleware(JwtStrategy) {
	getAuthenticateOptions(): Promise<passport.AuthenticateOptions> | passport.AuthenticateOptions {
		const ctx = useContext<Context>()
		console.log(
			`<-- [${ctx.method}] ${ctx.url}`
		  )
		console.log('??????????')
		return {}
	}
}