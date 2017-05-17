'use strict'

const passport = require('passport')
const { Strategy } = require('passport-local')
const { knex } = require('../db/database.js')

const User = require('../models/userModel.js');

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser( (id, done) => {
  knex('users').where({id}).first()
  .then( (user) => {
    console.log('user deserialize', user)
    return done(null, user)
  })
  .catch( (err) => done(err, null) )
});

const localStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, passwordStr, done) => {
    console.log("email and passwordStr:", email, passwordStr)
    User.findOneByEmail(email)
    .then( (user) => {
      if (user) {
        console.log('user in strat if:', user)
        return Promise.all([
            user,
            user.comparePass(passwordStr)
          ])
      }
      done( null, null, { msg: 'Email does not exist in our system'})
    })
    .then( ([user, matches]) => {
      if (matches) {
        done(null, user, {msg: 'Successfuly logged in'})
      } else {
        console.log("user obj inside matches?:")
        done( null, null, {msg: 'Password does not match'})
      }
    })
    .catch(done)
})

passport.use(localStrategy)
