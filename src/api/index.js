import request from '../utils/request'

export default {
  getSomeApi (params) {
    return request('someApi', params, {})
  }
}
