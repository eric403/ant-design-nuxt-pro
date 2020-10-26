<template>
  <a-dropdown class="right">
    <div class="avatar-dropdown-wrapper">
      <a-avatar :size="26" icon="user" /> <span>{{ $auth.login }}</span>
    </div>
    <a-menu slot="overlay">
      <a-menu-item key="account-center">
        <nuxt-link to="/account/center"><a-icon type="user" /> 个人中心</nuxt-link>
      </a-menu-item>
      <a-menu-item key="account-settings">
        <nuxt-link to="/account/settings"><a-icon type="setting" /> 个人设置</nuxt-link>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item key="logout">
        <nuxt-link to="/logout"><a-icon type="logout" /> 退出登录</nuxt-link>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<style lang="less" scoped>
.avatar-dropdown-wrapper {
  cursor: pointer;
  padding: 0 12px;
  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}
.ant-avatar {
  margin: 8px;
}
</style>
