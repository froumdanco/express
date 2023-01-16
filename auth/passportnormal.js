const  passport = require("passport");
const  passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const  StrategyJwt = passportJWT.Strategy;
const  users = require("../app/models/users.model");
passport.use(
   new StrategyJwt({
       jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
       secretOrKey :process.env.JWD_SECRET,
   },
   function(jwtPayload,done){
       console.log(jwtPayload.email)
        return users.findOne({email:jwtPayload.email,admin:false}).then((users)=>
        {
            return done(null,users)
        }).catch((eer)=>{
            return done(err);
        })
   })


)