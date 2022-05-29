import { message } from 'antd'
import { setupHttpClient, Middleware } from '@midwayjs/rpc'

const ErrorHandler: Middleware = async (ctx, next) => {
    try {
        await next()
    } catch (res) {
        switch (res.status) {
        case 400:
            message.error(`非法请求: ${res.data.errMsg}`)
            break
        case 401:
            message.error('登陆状态失效，请重新登录')
            setTimeout(
                () => {
                    location.href = '/login'
                },
                1000
            );
            break
        case 500:
            message.error('服务器错误')
            break
        default:
            message.error(`未知错误: ${res.status}`)
            break
        }
    }
}

const AuthHandler: Middleware = async (ctx, next) => {
    const token = window.localStorage.getItem('token')
    if (token) {
        ctx.req.headers['Authorization'] = `Bearer ${token}`
    }
    await next()
}

export const initHttpClinet = () => setupHttpClient({
    withCredentials: true,
    middleware: [AuthHandler, ErrorHandler]
})
