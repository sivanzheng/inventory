
import * as jwt from 'jsonwebtoken'
import * as crypto from 'crypto'
import { Api, Post, useContext } from '@midwayjs/hooks'
import { Context } from '@midwayjs/koa'
import { Login } from '@src/api/models/User'
import { Users } from '@src/api/entity/UsersEntity'
import { useEntityModel } from '@midwayjs/orm'

export const login = Api(
	Post('/login'),
	async (body: Login) => {
		const ctx = useContext<Context>()
		console.log(body)
		const { account, password } = body
		if (!account || !password) {
			ctx.status = 400				
			return '请输入账号和密码!'
		}
		const user = await useEntityModel(Users).findOne({ where: { account }})
		console.log('-----------------', user)
		if (!user) {
			ctx.status = 400				
			return '账号或密码错误!'
		}
		const md5 = crypto.createHash('md5').update(password).digest('hex')
		if (md5 !== user.password) {
			ctx.status = 400				
			return '账号或密码错误!'
		}
		const token = jwt.sign(
			{ account },
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRES_IN }
		)
		return {
			token
		}
	}
)