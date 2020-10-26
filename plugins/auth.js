export default (ctx, inject) => {
  const auth = {
    login: ctx.store.state.login,
    role: ctx.store.state.role,
    hasRole(roles = []) {
      return roles.includes(ctx.store.state.role)
    },
  }
  inject('auth', auth)
}
