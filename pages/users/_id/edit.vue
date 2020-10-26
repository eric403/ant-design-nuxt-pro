<template>
  <div>
    <page-header :title="title" :routes="routes"></page-header>

    <a-card :bordered="false" :loading="loading">
      <a-form ref="form" :form="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="用户名">
          <a-input v-decorator="['login', { rules: [{ required: true, message: '不能为空' }] }]"></a-input>
        </a-form-item>

        <a-form-item label="手机号">
          <a-input v-decorator="['phone', { rules: [{ required: true, message: '不能为空' }] }]"></a-input>
        </a-form-item>

        <a-form-item label=" " :colon="false">
          <a-space>
            <a-button type="primary" @click="onSubmit">保存</a-button>
            <a-button><nuxt-link to="/users">返回</nuxt-link></a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { users } from '~/api/admin'

export default {
  data() {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
      loading: false,
      id: null,
      form: this.$form.createForm(this),
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
          breadcrumbName: '修改',
        },
      ],
    }
  },
  computed: {
    title() {
      return `修改用户 - ${this.id}`
    },
  },
  mounted() {
    this.index()
  },
  methods: {
    index() {
      this.id = this.$route.params.id
      this.loading = true
      users
        .edit(this.$axios, this.id)
        .then((res) => {
          this.item = res.item
          this.form.setFieldsValue(res.item)
        })
        .finally(() => {
          this.loading = false
        })
    },
    onSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$confirm({
            title: '提示',
            content: `确认保存?`,
            onOk: () => {
              console.log('Received values of form: ', values)
              const user = values

              users.update(this.$axios, this.id, { user }).then((res) => {
                if (res.success) {
                  this.$message.info(res.msg)
                } else {
                  this.$message.error(res.msg)
                }
              })
            },
          })
        }
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
