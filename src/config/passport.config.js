import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { UserModel } from '../models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET };

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await UserModel.findById(jwt_payload.id);
      if (user) return done(null, user);
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;