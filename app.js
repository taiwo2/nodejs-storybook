const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const mongoose  = require('mongoose')
const morgan = require('morgan')
const connectDB= require('./config/db')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore= require('connect-mongo')
// load config
dotenv.config({path: './config/config.env'})

// passport config 
require('./config/passport')(passport)

connectDB()
const app = express();

//body parser to send in post request

app.use(express.urlencoded({extended: false}))
app.use(express.json())

if (process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}


/// handleBars
app.engine('.hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine','.hbs');
// session middleware

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store:  MongoStore.create({ mongoUrl: process.env.MONGO_URI})
}))
// store: MongoStore.create({ mongoUrl: 'mongodb+srv://<id+ password>@cluster0.cq7f2.mongodb.net/DBname?retryWrites=true&w=majority' })
// }))
// passport middleware
app.use(passport.initialize())
app.use(passport.session())


// static
app.use(express.static(path.join(__dirname, 'public')))

//Route
app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))
app.use('/stories',require('./routes/stories'))

const PORT = process.env.PORT || 5000
app.listen(PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on ${PORT} port `))