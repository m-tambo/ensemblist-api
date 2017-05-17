const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)
const cookieParser = require('cookie-parser')
const flash = require('express-flash')
const { knex } = require('./db/database')
require('dotenv').config()

const routes = require('./routes') // automatically looks for index.js file
const port = process.env.PORT || 3030  // sets port to 3030 if env variable is undefined

app.use(cors()) // allows cross-origin sharing
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ type: '*/*' }))

app.use(cookieParser('gigsecret'))
app.use(session({cookie: {maxAge: 60000}, secret: 'gigsecret', resave: true, saveUninitialized: false}))
app.use(flash());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  store: new KnexSessionStore({
    knex,
    tablename: 'sessions'
  }),
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET || 'ensemblistsecretkey'
}))

require('./lib/passport-strategies.js')
app.use(passport.initialize())
app.use(passport.session())

app.use( (req, res, next) => {
  app.locals.email = req.user && req.user.email
  next()
})

// app.post('/test', (req, res) => res.send(`Hello ${req.body.name}`))
app.use('/api/v1', routes)

app.use((err, req, res, next) => { // error msg for all routes
  console.log("err:", err)
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: err
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port} in env: ${process.env.NODE_ENV}`);
});

module.exports = app;
