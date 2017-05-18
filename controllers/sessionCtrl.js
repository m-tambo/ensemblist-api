'use strict'

const passport = require('passport')

// login
module.exports.createSession = (req, res, next) => {
  const user = { email: req.body.email, password: req.body.password }
  // console.log("user in the sessionCtrl:", user)
  passport.authenticate('local', (err, user, msg) => {
    if (err) return next(err)
    // console.log("user obj inside the pass.auth:", user)
    if (!user) return res.status(201).json({ "msg": "User not found" })

    req.logIn(user, (err) => {
      console.log("login called:", user)
      if (err) return next(err)
      res.status(200).json(user)
    })
  })(req, res, next)
}
// logout
module.exports.destroySession = (req, res) => {
  console.log("Destroy called");
  req.logout()
  res.redirect('/login')
}
