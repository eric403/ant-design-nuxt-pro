import { auth } from '~/api/admin'

export default function (ctx) {
  const { store, route, $axios } = ctx
  if (['/login', '/logout'].includes(route.path) || store.state.login) {
    return true
  } else {
    return auth.info($axios, { to: route.path }).then((res) => {
      if (res) {
        store.commit('login', res)

        ctx.$auth.login = store.state.login
        ctx.$auth.role = store.state.role
      }
    })
  }
}
