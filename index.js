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


/**
 * input file
 */
onClick=(event)=> {event.target.value = null}



/**
*对象相等判断（浅比较）
*/
const objectEquals = (obj1, obj2) => {
  if(!obj1 || !obj2){
    return false
  }
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  if(keys1.length !== keys2.length){
    return false
  }
  for(let i = 0; i < keys1.length; i++){
    const key = keys1[i]
    if(keys2.indexOf(key) < 0){
      return false
    }else{
      if(obj1[key] !== obj2[key]){
        return false
      }
    }
  }
  return true
}

/**
*对象或数组相等判断（深比较）
*/
const objectDeepEquals = (obj1, obj2) => {
  if(obj1 === obj2){
    return true
  }
  if(obj1 === null || obj1 === undefined || obj2 === null || obj2 === undefined){
    return false
  }
  if(typeof obj1 === 'object' && typeof obj2 === 'object'){
    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)
    if(keys1.length !== keys2.length){
      return false
    }
    for(let i = 0; i < keys1.length; i++){
      const key = keys1[i]
      if(keys2.indexOf(key) < 0){
        return false
      }else{
        const equals = objectDeepEquals(obj1[key], obj2[key])
        if(!equals){
          return false
        }
      }
    }
    return true
  }else if(obj1 instanceof Array && obj2 instanceof Array){
    if(obj1.length !== obj2.length){
      return false
    }
    for(let i = 0; i < obj1.length; i++){
      const val1 = obj1[i]
      const val2 = obj2[i]
      if(!objectDeepEquals(val1, val2)){
        return false
      }
    }
    return true
  }else{
    return false
  }
}

/**
 * 对象深拷贝（不考虑带有function属性的情况）
 * @param  {object} obj 待拷贝的对象
 * @return {object}
 */
const cloneObjectDeep = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

