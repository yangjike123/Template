import { connect as reduxConnect, useSelector } from 'react-redux'
import { init, createModel } from '@rematch/core'
import loadingPlugin from '@rematch/loading'
import axios from 'axios'
import { ELocalStorage } from '../cofing/Enum'

/*------------------------- 基于rematch实现的类dva框架 -------------------------*/
const dvaParams: any = { storeInstance: null, printLog: false }
export const initModels = (modelArray: any, printLog:boolean = false) => {
  const models: any = {}
  for (let model of modelArray) {
    models[model.namespace] = createModel()({
      ...model,
      effects: dispatch => {
        let newEffects: any = {}
        let namespace = model.namespace
        for (let key in model.effects) {
          newEffects[key] = async (payload: any, rootState: any) => {
            return await model.effects[key](
              { state: rootState[namespace], payload },
              {
                reducer: (...args: any) => {
                  if (args.length <= 2) {
                    args.unshift(namespace)
                  }
                  dvaParams.printLog && console.log('[reducer]', args[0], args[1], args[2])
                  dispatch[args[0]][args[1]](args[2])
                },
                select: (namespace2: string) => rootState[namespace2],
                effect: async (...args: any) => {
                  if (args.length <= 2) {
                    args.unshift(namespace)
                  }
                  dvaParams.printLog && console.log('[effect]', args[0], args[1], args[2])
                  return await dispatch[args[0]][args[1]](args[2])
                },
              }
            )
          }
        }
        return newEffects
      },
    })
  }
  dvaParams.printLog = printLog
  dvaParams.storeInstance = init({ models, plugins: [loadingPlugin({ type: 'full' })] })
  return dvaParams.storeInstance
}
export const useLoading = (namespace: string) => {
  return useSelector((store: any) => {
    return store.loading.models[namespace]
  })
}
export const useConnect = (namespace: string) => {
  return useSelector((store: any) => {
    return store[namespace]
  })
}
export const reducer = (namespace: string, type: any, payload: any) => {
  dvaParams.printLog && console.log('[reducer]', namespace, type, payload)
  return dvaParams.storeInstance.dispatch[namespace][type](payload)
}
export const effect = async (namespace: string, type: any, payload: any) => {
  dvaParams.printLog && console.log('[effect]', namespace, type, payload)
  return await dvaParams.storeInstance.dispatch[namespace][type](payload)
}

/*------------------------- 基于axios实现的通用request，json格式，jwt校验 -------------------------*/
const requestParams: any = { serverHome: null, errorHanlder: null, printLog: false, extraHeaders: {} }
export function initRequest(serverHome: any, errorHanlder: any, printLog = false) {
  requestParams.printLog = printLog
  requestParams.serverHome = [].concat(serverHome)
  requestParams.errorHanlder = errorHanlder
}
export function bindHeader(key: string, value: string) {
  requestParams.extraHeaders[key] = value
}
export function bindJWTToken(token: string) {
  if (token) {
    localStorage.setItem(ELocalStorage.Token, token)
    requestParams.extraHeaders['Authorization'] = token
  } else {
    localStorage.removeItem(ELocalStorage.Token)
    delete requestParams.extraHeaders['Authorization']
  }
}
export function requestGet(url: string, body: any, serverHomeIndex:number = 0) {
  return request(url, { method: 'GET', body }, null, serverHomeIndex)
}
export function requestDelete(url: string, body: any, serverHomeIndex:number = 0) {
  return request(url, { method: 'DELETE', body }, null, serverHomeIndex)
}
export function requestPost(url: string, body: any, serverHomeIndex:number = 0) {
  return request(url, { method: 'POST', body }, null, serverHomeIndex)
}
export function requestPatch(url: string, body: any, serverHomeIndex:number = 0) {
  return request(url, { method: 'PATCH', body }, null, serverHomeIndex)
}
export function requestPut(url: string, body: any, serverHomeIndex:number = 0) {
  delete body.id
  return request(url, { method: 'PUT', body }, null, serverHomeIndex)
}
export function requestFile(url: string, file: File, serverHomeIndex:number = 0) {
  let body = new FormData()
  body.append('file', file)
  return request(url, { method: 'POST', body }, 'application/form-data', serverHomeIndex)
}
function request(url: string, options: any, ContentType: any = null, serverHomeIndex = 0) {
  return new Promise((resolve, reject) => {
    let { method, body }: { method: string, body: any } = options
    // 添加url前缀
    if (url.indexOf('https://') === -1 && url.indexOf('http://') === -1) {
      url = requestParams.serverHome[serverHomeIndex] + (url.indexOf('/') === 0 ? url.substr(1) : url)
      if (!requestParams.extraHeaders['Authorization']) {
        const token = localStorage.getItem(ELocalStorage.Token)
        token && (requestParams.extraHeaders['Authorization'] = token)
      }
    }
    let option: any = {
      method,
      url,
      headers: {
        Accept: 'application/json',
        Pragma: 'no-cache',
        'Cache-Control': 'no-cache',
        Expires: 0,
        'Content-Type': ContentType || 'application/json; charset=utf-8',
        ...requestParams.extraHeaders,
      },
    }
    // 参数赋值
    switch (method.toUpperCase()) {
      case 'GET':
      case 'DELETE':
        option.params = body || {}
        break
      case 'POST':
      case 'PATCH':
      case 'PUT':
        option.data = body || {}
        break
    }

    axios(option)
      .then(({ data }) => {
        requestParams.printLog && console.log('[request]', method, url, body, data)
        resolve(data)
      })
      .catch(e => {
        if (e.response) {
          let { status, data } = e.response
          requestParams.errorHanlder(status, data)
          reject(data)
        } else {
          throw e
        }
      })
  })
}
