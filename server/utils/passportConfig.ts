import { Strategy, StrategyOptions } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import passport from "passport";
import user from "../models/user";

const JwtStrategy = Strategy;
const opts: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: "secret",
};
passport.use(
	new JwtStrategy(opts, async (jwt_payload, done) => {
		try {
			const currentUser = await user.findOne({
				where: { userId: jwt_payload.id },
			});
			if (currentUser) {
				return done(null, currentUser);
			}
			return done(null, false);
		} catch (e) {
			return done(e, false);
		}
	})
);
