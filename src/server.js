'use strict'
import fs from 'fs'
import path from 'path'

import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import sessions from 'client-sessions'
import compress from 'compression'
import layouts from 'express-ejs-layouts'
import favicon from 'serve-favicon'
import {ensureAuthenticated} from './server/middlewares/auth.js'
import {runWebpackDevServer} from './server/routes/webpackDevServer.js'
const app = express()

app.set('layout')
app.set('view engine', 'ejs')
app.set('view options', {layout: 'layout'})
app.set('views', path.join(__dirname, './server/views'))

app.use(favicon(path.join(process.cwd(), './static/favicon.ico')))
app.use(cookieParser(process.env.SECRET_KEY))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(sessions({
  cookieName: 'session',
  secret: process.env.SECRET_KEY,
  duration: 24 * 60 * 60 * 1000,
  activeDuration: 1000 * 60 * 5,
  cookie: {
    path: '/',
    ephemeral: false,
    httpOnly: true,
    secure: false
  }
}))

app.use(compress())
app.use(layouts)
app.use('/static', express.static(path.join(process.cwd(), '/static')))
console.log(`✅  ==> '/static' mapped to ${path.join(process.cwd(), '/static')}`)

app.disable('x-powered-by')

let env = {
  production: process.env['NODE_ENV'] === 'production'
}

if (env.production) {
  env['assets'] = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'assets.json')))
}

app.use('/', require('./server/routes/public.js').default)

// =============================================================================
// ⬆️ Publicly-accessible routes above
// ⬇️ Authenticated routes below
// =============================================================================

app.use(ensureAuthenticated)
app.use('/graphql', require('./server/routes/graphql.js').default)
app.all('/*', ensureAuthenticated, (req, res) => {
  let user = req.session.simplifiedUser
  res.render('index', {
    env,
    user
  })
})

const port = Number(process.env['PORT'] || 3000)

app.listen(port, function () {
  console.log(`✅  ==> server running at http://localhost:${port}`)
})

if (!env.production) {
  runWebpackDevServer()
}
