export function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    let raw = req.session.passport.user
    let user = {
      id: raw.profile.id,
      email: raw.profile.emails[0].value,
      name: raw.profile.displayName,
      accessToken: raw.accessToken
    }
    // only allow access for company employees.
    if (/@mycompany\.com$/.test(user.email)) {
      req.session.simplifiedUser = user
      return next()
    } else {
      res.end('Sorry, authenticated mycompany people only.')
    }
  } else {
    req.session.returnTo = req.path
    res.redirect('/auth/heroku')
  }
}
