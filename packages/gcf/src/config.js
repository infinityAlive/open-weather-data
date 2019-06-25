import 'dotenv/config'

const config = {
  cwbAuthorization: process.env['CWB_AUTHORIZATION'],
  mongoDbUri: process.env['MONGODB_URI']
}

export default config