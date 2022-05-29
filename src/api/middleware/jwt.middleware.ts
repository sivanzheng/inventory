import * as jwt from 'jsonwebtoken'
import { useContext } from '@midwayjs/hooks'
import { Context, NextFunction } from '@midwayjs/koa'

const jwtMiddleware = async (next: NextFunction) => {
    const ctx = useContext<Context>()

    if (!/(?=\/api)/.test(ctx.path) || /login$/.test(ctx.path)) {
        return await next()
    }

    if (ctx.header && ctx.header.authorization) {
        const parts = ctx.header.authorization.split(' ')
        if (parts.length === 2) {
            const scheme = parts[0]
            const token = parts[1]

            if (/^Bearer$/i.test(scheme)) {
                try {
                    const payload = jwt.verify(token, process.env.JWT_SECRET, {
                        complete: false
                    })
                    if (payload) {
                        return await next()
                    }
                } catch (error) {
                    ctx.status = 401
                    return ctx.body = {
                        code: 401,
                        data: error.message
                    }
                }
            }
        }
    }
    ctx.status = 401
    return ctx.body = {
        code: 401,
        data: 'No login authorization'
    }
}

export default jwtMiddleware
