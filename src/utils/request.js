import axios from 'axios'
import qs from 'qs'

const apiConfig = {
  distributor: '/distributor',
  dev: 'https://dev-api.xinc818.com',
  daily: 'https://daily-api.xinc818.com',
  gray: 'https://gray-api.xinc818.com',
  online: 'https://api.xinc818.com'
}

export const ENV = (() => {
  const hostName = window.location.hostname
  if (hostName.includes('localhost')) return 'distributor' // 本地转发
  if (hostName.includes('dev')) return 'dev' // 开发
  if (hostName.includes('daily')) return 'daily' // 测试
  if (hostName.includes('gray')) return 'gray' // 预发
  return 'online'
})()

const instance = axios.create({
  method: 'get',
  withCredentials: true,
  timeout: 10000,
  headers: {
    Accept: '*',
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})

instance.interceptors.response.use(res => {
  return res
}, err => {
  return Promise.reject(err)
})

const normalHandler = (resolve, res) => {
  let r = res.data
  if (r && typeof r === 'string') {
    r = JSON.parse(r)
  }
  if (r) {
    if (r.status) {
      r && resolve(r)
    } else {
      // Toast({
      // message: r.message,
      // duration: 3000
      // })
    }
  } else {
    res && resolve({
      status: 0,
      code: 500,
      error: '未知错误'
    })
  }
}

const errorHandler = (reject, err) => {
  reject({
    status: 0,
    code: 500,
    error: err.message || err
  })
}

export default async (url = '', data = {}, option = {}) => {
  const method = option.method || 'get'
  if (url.indexOf('http') !== 0) {
    const prefix = apiConfig[ENV]
    url = prefix + url
  }
  const config = {
    url,
    ...option,
    method
  }
  if (method.toLocaleLowerCase() === 'get') {
    config.params = data
  } else {
    config.data = data
  }
  if (option.headers && option.headers['Content-Type'] === 'multipart/form-data') {
    instance.defaults.transformRequest = [function (data) {
      return data
    }]
  } else if (option.headers && option.headers['Content-Type'] === 'application/json') {
    instance.defaults.transformRequest = [function (data) {
      return JSON.stringify(data)
    }]
  } else {
    instance.defaults.transformRequest = [function (data) {
      data = qs.stringify(data)
      return data
    }]
  }
  return new Promise((resolve, reject) => {
    instance.request(config).then(res => {
      normalHandler(resolve, res)
    }).catch(err => {
      errorHandler(reject, err)
    })
  })
}
