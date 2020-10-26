<template>
  <div>
    <page-header :title="title" :routes="routes"></page-header>

    <a-card :bordered="false">
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
          breadcrumbName: '新建',
        },
      ],
    }
  },
  computed: {
    title() {
      return `新建用户`
    },
  },
  mounted() {
    this.index()
  },
  methods: {
    index() {
      this.loading = true
      users
        .new(this.$axios)
        .then((res) => {
          // TODO
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

              users
                .create(this.$axios, { user })
                .then((res) => {
                  if (res.success) {
                    this.$message.info(res.msg)
                  } else {
                    this.$message.error(res.msg)
                  }
                })
                .catch(() => {
                  this.$error({
                    title: 'OOPS!',
                    content: '服务器错误！',
                  })
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
