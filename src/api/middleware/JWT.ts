import jwt from 'koa-jwt'

const JWT = jwt({ secret: process.env.JWT_SECRET }).unless({ path: '/login' })

export default JWT