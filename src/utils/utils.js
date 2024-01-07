import { constants } from './constants'

// this function would create a final url for an API
// const registerUrl = createUrl('/user/register')
// const registerUrl = 'http://localhost:3000' + '/user/register'
// const registerUrl = 'http://localhost:3000/user/register'
export function createUrl(path) {
  return constants.serverUrl + path
}

// use the logging on console by default
export function log(message) {
  console.log(message)
}
