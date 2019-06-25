import request from 'superagent'
import http from 'http'
import https from 'https'

https.globalAgent.maxSockets = 10
http.globalAgent.maxSockets = 10

const ajax = (httpMethod, url, type, headers, payload) => {
  let ajax = request(httpMethod, url)
    .timeout(30 * 1000)

  if (type)
    ajax.type(type)

  if (headers) {
    ajax.set(headers)
  }

  if (payload) {
    ajax.send(payload)
  }

  return ajax
}

export default ajax
