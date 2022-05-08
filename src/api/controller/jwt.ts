
import { Api, Get, Post } from '@midwayjs/hooks'
import { Context } from '@midwayjs/koa'
import { JwtService } from '@midwayjs/jwt'
import JwtPassportMiddleware from '@src/api/middleware/jwt.middleware'

const jwt = new JwtService()

export const getJWT = Api(
	Get('/jwt'),
	async () => {
		return {
			t: await jwt.sign({ msg: '' })
		}
	}
)