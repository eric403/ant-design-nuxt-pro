<template>
  <div>
    <page-header :title="title" :routes="routes"></page-header>

    <a-card :bordered="false">
      <user-show :item="item"></user-show>
      <div class="table-operator">
        <a-button><nuxt-link :to="`/users`">返回</nuxt-link></a-button>
      </div>
    </a-card>
  </div>
</template>

<script>
import { users } from '~/api/admin'

export default {
  data() {
    return {
      item: {},
      id: null,
      routes: [
        {
          path: '/',
          breadcrumbName: '首页',
        },
        {
          path: '/users',
          breadcrumbName: '用户',
        },
        {
          breadcrumbName: '查看',
        },
      ],
    }
  },
  computed: {
    title() {
      return `查看用户 - ${this.id}`
    },
  },
  mounted() {
    this.index()
  },
  methods: {
    index() {
      this.id = this.$route.params.id
      users.show(this.$axios, this.id).then((res) => {
        this.item = res.item
      })
    },
  },
  head() {
    return {
      title: this.title,
    }
  },
}
</script>
