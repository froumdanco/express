const  passport = require("passport");

const  passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const  StrategyJwt = passportJWT.Strategy;
const  users = require("../app/models/users.model");
passport.use('admin-rule',
   new StrategyJwt({
       jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
       secretOrKey :process.env.JWD_SECRET,
   },
   function(jwtPayload,done){
        return users.findOne({email:jwtPayload.email}).then((users)=>
        {
            return done(null,users)
        }).catch((eer)=>{
            return done(err);
        })
   })


)
passport.use('user-rule',
   new StrategyJwt({
       jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
       secretOrKey :process.env.JWD_SECRET,
   },
   function(jwtPayload,done){
        return users.findOne({email:jwtPayload.email,usertype:2}).then((users)=>
        {
            return done(null,users)
        }).catch((eer)=>{
            return done(err);
        })
   })


)

passport.use('user-rule-email',
   new StrategyJwt({
       jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
       secretOrKey :process.env.JWD_SECRET,
   },
   function(jwtPayload,done){
        return users.findOne({email:jwtPayload.email,usertype:2}).then((users)=>
        {
            return users.confrimemail==false ? done(null,users) :  done('')
        }).catch((eer)=>{
            console.log(err);
            return done(err);
        })
   })


)
