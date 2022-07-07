const express = require('express')
const router = express.Router()
const {ensureAuth} = require('../middleware/auth')
const Story = require('../model/Story')
const app = express()
// login route

router.get('/add', ensureAuth, (req,res) => {
  return res.render("stories/add")
})

module.exports = router