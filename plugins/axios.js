export default function ({ $axios, app, store, redirect }) {
  $axios.onRequest((config) => {
    // console.log('Making request to ' + config.url)
    config.paramsSerializer = (params) => {
      return require('qs').stringify(params, {
        arrayFormat: 'brackets',
        encode: false,
      })
    }
    return config
  })

  $axios.onResponse((response) => {
    if (response.data.status === 301) {
      redirect(response.data.redirectTo)
    }
    return response
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      redirect('/login')
      store.commit('login', false)
    }
    return error
  })
}
