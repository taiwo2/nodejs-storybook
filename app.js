const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB= require('./config/db')
const exphbs = require('express-handlebars')
// load config
dotenv.config({path: './config/config.env'})

connectDB()
const app = express();

if (process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

/// handleBars
app.engine('.hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine','.hbs');

// static
app.use(express.static(path.join(__dirname, 'public')))

//Route
app.use('/',require('./routes/index'))

const PORT = process.env.PORT || 5000
app.listen(PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on ${PORT} port `))