// import router from './server'
import cors from 'cors'
import loginService from '../service/login-service'
import { HttpStatus, LoginInfo } from '../common/messages'

const register = (request, response) => {
  let corsFn = cors()
  corsFn(request, response, async () => {
    if (request.method === 'POST') {
      const account = request.body.account
      const password = request.body.password
      const loginMessage = await loginService.register(account, password)

      if (loginMessage.indexOf('failed') >= 0) {
        response.status(HttpStatus.SERVER_ERROR_500).send(loginMessage)
      } else {
        response.status(HttpStatus.OK_200).send(loginMessage)
      }
    }
  })
}

const login = (request, response) => {
  let corsFn = cors()
  corsFn(request, response, async () => {
    if (request.method === 'POST') {
      const account = request.body.account
      const password = request.body.password
      const loginMessage = await loginService.retrieve(account, password)

      if (loginMessage.indexOf('failed') >= 0) {
        response.status(HttpStatus.UNAUTHORIZED_401).send(loginMessage)
      } else {
        response.status(HttpStatus.OK_200).send(loginMessage)
      }
    }
  })
}

const logout = (request, response) => {
  let corsFn = cors()
  corsFn(request, response, async () => {
    if (request.method === 'POST') {
      // request.session.destroy(
      //   err => {
      //     if (err) {
      //       console.error(error)
      //       response.status(HttpStatus.SERVER_ERROR_500).send(LoginInfo.LOGOUT_FAILED)
      //     }
      //   })
      response.status(HttpStatus.OK_200).send(LoginInfo.LOGOUT_SUCCESS)
    }
  })
}

const checkSession = (request, response) => {
  let corsFn = cors()
  corsFn(request, response, async () => {
    if (request.method === 'POST') {
      if (request.session.account) {
        response.status(HttpStatus.OK_200).send()
      } else {
        response.status(HttpStatus.UNAUTHORIZED_401).send(LoginInfo.LOGOUT_FAILED)
      }
    }
  })
}

export { register, login, logout, checkSession }