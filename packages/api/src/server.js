import express from 'express'
import session from 'express-session'
import cors from 'cors'
import bodyParser from 'body-parser'
import router from './router'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const app = express()
const port = 8080
const server = app.listen(port, () => {
  let host = server.address().address
  let port = server.address().port
  console.log(`listening at host(${host}), port(${port})`)
})
const sessionConfig = {
  secret: 'open-weather-data',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 10 * 1000
  }
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sessionConfig.cookie.secure = true // serve secure cookies
}

app.use(session(sessionConfig))
app.use(cors())
app.options('*', cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api/infinity2015/weather', router)