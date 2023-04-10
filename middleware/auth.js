module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        console.log('ensureAuth- ','req.session:' , req.session, 'is authenticated')
        return next()
      } else {
        res.redirect('/')
      }
    }
  }
