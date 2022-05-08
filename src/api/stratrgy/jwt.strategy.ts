import { CustomStrategy, PassportStrategy } from '@midwayjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import * as dotenv from 'dotenv'

dotenv.config()

// https://midwayjs.org/docs/extensions/passport#%E7%A4%BA%E4%BE%8Bjwt-%E7%AD%96%E7%95%A5
@CustomStrategy()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt'
) {
    async validate(payload) {
        console.log('payload: ', payload)
        return payload
    }

    getStrategyOptions() {
        return {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        }
    }
}