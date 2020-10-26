<template>
  <a-config-provider :locale="locale">
    <a-layout>
      <a-layout-sider v-if="$auth.login" v-model="collapsed" class="sider" :width="256">
        <div class="logo">
          <nuxt-link to="/">
            <logo></logo>
            <h1>Ant Design Nuxt Pro</h1>
          </nuxt-link>
        </div>

        <a-menu :selected-keys="selectedKeys" theme="dark" :mode="mode" @select="onSelect" @click="onClick">
          <template v-for="item in menus">
            <a-menu-item v-if="!item.children && $auth.hasRole(item.roles)" :key="item.path">
              <a-icon v-if="item.icon" :type="item.icon"></a-icon>
              <span>{{ item.title }}</span>
            </a-menu-item>
            <sub-menu v-else-if="$auth.hasRole(item.roles)" :key="item.key" :menu-info="item"></sub-menu>
          </template>
        </a-menu>
      </a-layout-sider>

      <a-layout>
        <a-layout-header v-if="$auth.login" class="header">
          <a-icon
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            :style="{ fontSize: '20px' }"
            @click="toggleCollapsed"
          />
          <avatar-dropdown></avatar-dropdown>
        </a-layout-header>

        <a-layout-content
          :style="{
            padding: '24px',
            margin: 0,
            minHeight: 'calc(100vh - 64px)',
          }"
        >
          <nuxt keep-alive />
        </a-layout-content>
        <a-layout-footer style="text-align: center">Ant Design Nuxt Pro©2020 Created by eric</a-layout-footer>
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN'

export default {
  middleware: 'auth',
  data() {
    return {
      collapsed: false,
      mode: 'inline',
      locale: zhCN,
      selectedKeys: [],
      menus: [
        {
          title: '首页',
          icon: 'dashboard',
          path: '/dashboard/workplace',
          roles: ['Admin'],
        },
        {
          title: '用户',
          icon: 'user',
          path: '/users',
          roles: ['Admin'],
        },
        {
          title: '文章',
          icon: 'folder',
          path: '/articles',
          roles: ['Editor'],
        },
        {
          title: '日志',
          icon: 'file-text',
          path: '/audit_logs',
          roles: ['Admin'],
          children: [
            {
              title: '安全日志',
              path: '/audit_logs',
              roles: ['Admin'],
            },
          ],
        },
        {
          title: '网站管理',
          icon: 'setting',
          path: '/settings',
          roles: ['Admin'],
          children: [
            {
              title: '常用设置',
              path: '/settings',
            },
          ],
        },
      ],
    }
  },
  methods: {
    onSelect({ item, key }) {
      this.selectedKeys = [key]
    },
    onClick({ item, key, keyPath }) {
      this.$router.push(key)
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    },
  },
}
</script>

<style lang="less" scoped>
.logo {
  position: relative;
  height: 64px;
  padding-left: 24px;
  overflow: hidden;
  transition: all 0.3s;
  line-height: 64px;
  background: #001529;

  svg {
    height: 32px;
    width: 32px;
    vertical-align: middle;
  }
  h1 {
    color: #fff;
    font-size: 18px;
    margin: 0 0 0 8px;
    font-weight: 600;
    vertical-align: middle;
    display: inline;
  }
}
.ant-menu-item {
  a {
    display: inline-block;
    color: currentColor;
  }
}
</style>
