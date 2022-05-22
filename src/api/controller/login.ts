
import * as jwt from 'jsonwebtoken'
import * as crypto from 'crypto'
import { Api, Post, useContext } from '@midwayjs/hooks'
import { Context } from '@midwayjs/koa'
import { Login } from '@src/api/models/User'
import { Users } from '@src/api/entity/UsersEntity'
import { useEntityModel } from '@midwayjs/orm'
import Response from '@src/api/models/Response'

const errorRes = (code: number, errMsg: string, ctx: Context) => {
	ctx.status = code
	return {
		code,
		errMsg
	}
}

export const login = Api(
	Post('/api/login'),
	async (body: Login): Promise<Response<string>> => {
		const ctx = useContext<Context>()
		const { account, password } = body
		if (!account || !password) {
			return errorRes(400, '请输入账号和密码!', ctx)
		}
		const user = await useEntityModel(Users).findOne({ where: { account } })
		if (!user) {
			return errorRes(400, '账号或密码错误!', ctx)
		}
		const md5 = crypto.createHash('md5').update(password).digest('hex')
		if (md5 !== user.password) {
			return errorRes(400, '账号或密码错误!', ctx)
		}
		const token = jwt.sign(
			{ account },
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRES_IN }
		)
		return {
			code: 200,
			data: token
		}
	}
)