<template>
  <div>
    <page-header :title="title" :sub-title="`共 ${total}`" :routes="routes"></page-header>

    <a-card :bordered="false">
      <a-form layout="inline">
        <a-form-item>
          <a-input v-model="query.login" placeholder="用户名" allow-clear></a-input>
        </a-form-item>
        <a-form-item>
          <a-input v-model="query.phone" placeholder="手机号" allow-clear></a-input>
        </a-form-item>
        <a-form-item>
          <span class="table-page-search-submitButtons">
            <a-button type="primary" @click="onSearch">查询</a-button>
            <a-button @click="onReset">重置</a-button>
          </span>
        </a-form-item>
      </a-form>

      <div class="table-operator">
        <a-button type="primary" icon="plus">
          <nuxt-link to="/users/new" class="ant-btn-primary">新建</nuxt-link>
        </a-button>
      </div>
    </a-card>

    <a-card :bordered="false">
      <a-table
        ref="table"
        :loading="loading"
        :pagination="pagination"
        :columns="columns"
        :data-source="items"
        size="default"
        row-key="id"
        @change="onChange"
      >
        <template slot="id" slot-scope="text, record">
          <a @click="onShow(record)">{{ record.id }}</a>
        </template>
        <template slot="action" slot-scope="text, record">
          <nuxt-link :to="`/users/${record.id}`">查看</nuxt-link>
          <a-divider type="vertical" />
          <nuxt-link :to="`/users/${record.id}/edit`">修改</nuxt-link>
          <a-divider type="vertical" />
          <a @click="onDestory(record)">删除</a>
        </template>
      </a-table>
    </a-card>

    <a-modal :width="640" :visible="visible" :footer="null" title="查看" @cancel="visible = false">
      <user-show :item="item"></user-show>
    </a-modal>
  </div>
</template>

<script>
import { users } from '~/api/admin'

export default {
  data() {
    return {
      query: {},
      items: [],
      item: {},
      visible: false,
      total: 0,
      pagination: {
        pageSize: 10,
        current: 1,
        total: 0,
        showTotal: (total) => `总数 ${total}`,
      },
      loading: false,
      columns: [
        {
          title: '#',
          key: 'id',
          scopedSlots: { customRender: 'id' },
        },
        { title: '用户名', dataIndex: 'login' },
        { title: '手机号', dataIndex: 'phone' },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
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
          breadcrumbName: '列表',
        },
      ],
    }
  },
  computed: {
    title() {
      return `用户列表`
    },
  },
  mounted() {
    this.query = Object.assign({}, this.$route.query)
    this.index()
  },
  methods: {
    index() {
      const query = this.query
      this.$router.push({ query })
      this.loading = true
      users
        .index(this.$axios, query)
        .then((res) => {
          this.items = res.items
          this.total = res.total
          this.pagination.total = res.total
          this.pagination.current = res.page
        })
        .finally(() => {
          this.loading = false
        })
    },
    onChange(pagination, filters, sorter) {
      this.query.page = pagination.current
      this.index()
    },
    onShow(record) {
      const id = record.id

      users
        .show(this.$axios, id)
        .then((res) => {
          this.visible = true
          this.item = res.item
        })
        .catch((err) => {
          this.$message.error({
            title: '错误',
            description: err.message,
          })
        })
    },
    onDestory(record) {
      const id = record.id

      this.$confirm({
        title: '提示',
        content: `确认删除 ${id} ?`,
        onOk: () => {
          return users
            .destory(this.$axios, id)
            .then((res) => {
              if (res.success) {
                this.$message.info(res.msg)
                this.index()
              } else {
                this.$message.error(res.msg)
              }
            })
            .catch(() => {
              this.$error({
                title: 'OOPS!',
                content: '服务器错误!',
              })
            })
        },
      })
    },
    onSearch() {
      this.query.page = 1
      this.index()
    },
    onReset() {
      this.query = {}
      this.index()
    },
  },
  head() {
    return {
      title: this.title,
    }
  },
}
</script>
