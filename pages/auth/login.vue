<template>
  <div class="main">
    <div class="logo"><logo /></div>
    <a-form id="formLogin" ref="formLogin" :form="form" class="user-layout-login" @submit.prevent="onSubmit">
      <a-form-item>
        <a-input
          v-decorator="[
            'login',
            {
              rules: [{ required: true, message: '请输入用户名' }],
            },
          ]"
          size="large"
          type="text"
          placeholder="帐户名或邮箱地址"
        >
          <a-icon slot="prefix" :style="{ color: 'rgba(0,0,0,.25)' }" type="user" />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [{ required: true, message: '请输入密码' }],
            },
          ]"
          size="large"
          type="password"
          autocomplete="false"
          placeholder="密码"
        >
          <a-icon slot="prefix" :style="{ color: 'rgba(0,0,0,.25)' }" type="lock" />
        </a-input>
      </a-form-item>

      <a-alert v-if="error" :message="error" type="error" />

      <a-form-item style="margin-top: 24px">
        <a-button size="large" type="primary" html-type="submit" class="login-button" block>确定</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { auth } from '~/api/admin'

export default {
  layout: 'blank',
  data() {
    return {
      error: false,
      form: this.$form.createForm(this),
    }
  },
  methods: {
    onSubmit(e) {
      const validateFieldsKey = ['login', 'password']
      this.form.validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          this.error = false
          auth.login(this.$axios, values).then((res) => {
            if (res.success) {
              this.$router.push('/')
            } else {
              this.error = res.error
            }
          })
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.main {
  min-width: 260px;
  width: 368px;
  margin: 100px auto;
}

.logo {
  margin: 2rem;
  text-align: center;
}
</style>
