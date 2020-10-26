const auth = {
  login(axios, data) {
    return axios.$post('/api/auth/login', data)
  },
  info(axios) {
    return axios.$get('/api/auth/info', {
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    })
  },
  logout(axios) {
    return axios.$post('/api/auth/logout')
  },
}

const dashboard = {
  index(axios, params) {
    return axios.$get(`/api/dashboard`, { params })
  },
}

const users = {
  resource: 'users',
  index(axios, params) {
    return axios.$get(`/api/${this.resource}`, { params })
  },
  show(axios, id, params) {
    return axios.$get(`/api/${this.resource}/${id}`, { params })
  },
  new(axios, params) {
    return axios.$get(`/api/${this.resource}`, { params })
  },
  create(axios, payload) {
    return axios.$post(`/api/${this.resource}`, payload)
  },
  edit(axios, id, params) {
    return axios.$get(`/api/${this.resource}/${id}`, { params })
  },
  update(axios, id, payload) {
    return axios.$put(`/api/${this.resource}/${id}`, payload)
  },
  destory(axios, id, params) {
    return axios.$delete(`/api/${this.resource}`, { params })
  },
}

export { auth, dashboard, users }
