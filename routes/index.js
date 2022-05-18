const express = require('express')
const router = express.Router()

const app = express()
// login route

router.get('/', (req,res) => {
  return res.render("login",{
    layout: 'login' ,
  })
})
// dashboard
router.get('/dashboard', (req,res) => {
  return res.render("dashboard")
})

module.exports = router