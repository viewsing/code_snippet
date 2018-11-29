/**
 * myFetch
 */
import { baseUrl } from './config'

const makeQueryString = (params) => {
  let queryString = ''
  if(params){
    Object.keys(params).forEach((key, i) => {
      const value = params[key]
      if(i > 0){
        queryString += '&'
      }
      queryString += `${key}=${value === null || value == undefined ? '' : value}`
    })
  }
  return queryString
}

export default (url, data, config={}) => {
  //get请求的参数拼接在url上面
  let extendUrl
  //POST请求，参数写在body，json格式要先json化
  let body
  //JSON要设置content-type为json
  let contentType

  //根据config配置请求参数
  if (config.method !== 'POST') {
    extendUrl = '?' + makeQueryString(data)
  } else {
    extendUrl = ''
    if (config.json) {
      body = JSON.stringify(data)
      contentType = 'application/json;charset=utf-8'
    } else {
      body = makeQueryString(data)
      contentType = 'application/x-www-form-urlencoded'
    }
  }

  //最终配置
  const options = {
    method: 'GET',
    headers: {
      token: '76751791-4745-4fca-8b85-1471163d64f7',
      Accept: 'application/json'
    },
    body,
    ...config
  }

  if (contentType) {
    options.headers['Content-Type'] = contentType
  }

  return fetch(baseUrl + url + extendUrl, options)
}

