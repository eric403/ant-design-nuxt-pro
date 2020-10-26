<template>
  <a-sub-menu
    v-if="menuInfo.roles ? $auth.hasRole(menuInfo.roles) : true"
    :key="menuInfo.key"
    v-bind="$props"
    v-on="$listeners"
  >
    <span slot="title">
      <a-icon v-if="menuInfo.icon" :type="menuInfo.icon"></a-icon>
      <span>{{ menuInfo.title }}</span>
    </span>
    <template v-for="item in menuInfo.children">
      <a-menu-item v-if="!item.children && $auth.hasRole(item.roles)" :key="item.path">
        <span>{{ item.title }}</span>
      </a-menu-item>
      <sub-menu v-else-if="$auth.hasRole(item.roles)" :key="item.path" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>

<script>
import { Menu } from 'ant-design-vue'

export default {
  name: 'SubMenu',
  // must add isSubMenu: true
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    // Cannot overlap with properties within Menu.SubMenu.props
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
