import 'dotenv/config'

const config = {
  mongoDbUri: process.env['MONGODB_URI'],
  key: process.env['KEY']
}

export default config