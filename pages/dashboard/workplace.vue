<template>
  <a-spin :spinning="loading">
    <template v-if="$auth.hasRole(['Admin'])">
      <a-card :bordered="false" :title="`当前时间 ${new Date().toLocaleString()}`">Hello, {{ $auth.role }} </a-card>
    </template>

    <template v-if="$auth.hasRole(['Editor'])">
      <a-card :bordered="false" :title="`当前时间 ${new Date().toLocaleString()}`">Hello, {{ $auth.role }} </a-card>
    </template>
  </a-spin>
</template>

<script>
import { dashboard } from '~/api/admin'

export default {
  layout(ctx) {
    return ctx.$auth.role.toLowerCase()
  },
  data() {
    return {
      admin: false,
      loading: true,
    }
  },
  mounted() {
    this.index()
  },
  methods: {
    index() {
      const params = {}
      dashboard
        .index(this.$axios, params)
        .then((res) => {
          Object.assign(this.$data, res)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style lang="less" scoped>
.dashboard {
  margin: 16px 0;
  .ant-card {
    margin-bottom: 24px;
  }
}
</style>
