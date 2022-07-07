const express = require('express')
const router = express.Router()
const passport = require('passport')
// passport login with google
// get route
const app = express()
// login route

router.get('/google', passport.authenticate('google', {scope: ['profile']}))

// google callback
// get route
router.get('/google/callback', passport.authenticate('google',{ failureRedirect: '/'}),
  (req,res) => {
    res.redirect('/dashboard')
  }
)

// @desc Logout user
// route auth/logout

router.get('/logout', (req,res) => {
  req.logout()
  res.redirect('/')
})
module.exports = router