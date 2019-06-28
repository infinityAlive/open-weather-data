<template>
  <section>
    <mu-flex class="margin-top" justify-content="center">
      <header class="header">註冊帳號</header>
    </mu-flex>
    <mu-flex class="margin-top" justify-content="center">
      <mu-form class="login-block" ref="register" :model="registerInfo">
        <mu-form-item label="帳號" prop="account" :rules="accountRules">
          <mu-text-field v-model="registerInfo.account"
                         prop="account"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="密碼" prop="password" :rules="passwordRules">
          <mu-text-field type="password" v-model="registerInfo.password"
                         prop="password"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="再次確認密碼" prop="confirmPassword" :rules="confirmPasswordRules">
          <mu-text-field type="password" v-model="registerInfo.confirmPassword"
                         prop="confirmPassword"></mu-text-field>
        </mu-form-item>
        <mu-form-item>
          <mu-button color="primary" @click="register">確認註冊</mu-button>
        </mu-form-item>
      </mu-form>
    </mu-flex>
    <mu-flex class="margin-top" justify-content="center">
      <mu-circular-progress v-show="isLoading" :stroke-width="5" :size="50"></mu-circular-progress>
    </mu-flex>
  </section>
</template>

<script>
  import { Popup } from '@/modules/message-text'

  export default {
    name: 'Register',
    data () {
      const vueModel = this
      return {
        isLoading: false,
        registerInfo: {
          account: '',
          password: '',
          confirmPassword: ''
        },

        accountRules: [
          {
            validate (account) {
              return !!account
            },
            message: '帳號不能為空值'
          },
          {
            validate (account) {
              return account.length >= 3
            },
            message: '帳號必須大於 2 個字元'
          }
        ],

        passwordRules: [
          {
            validate (password) {
              return !!password
            },
            message: '密碼不能為空值'
          },
          {
            validate (password) {
              return password.length >= 3 && password.length <= 10
            },
            message: '密碼長度介於 3 ~ 10 字元'
          }
        ],

        confirmPasswordRules: [
          {
            validate (confirmPassword) {
              console.log(confirmPassword)
              return (confirmPassword === vueModel.registerInfo.password)
            },
            message: '確認密碼與輸入之密碼不符'
          }
        ],
      }
    },

    methods: {
      async register () {
        const vueModel = this
        let validateResult = await vueModel.$refs.register.validate()
        if (validateResult === true) {
          vueModel.isLoading = true
          let response, popupInfo
          try {
            response = await vueModel.$axios({
              method: 'post',
              url: '/api/register',
              data: {
                account: vueModel.registerInfo.account,
                password: vueModel.registerInfo.password
              }
            })
            vueModel.isLoading = false
          } catch (error) {
            vueModel.isLoading = false
            throw error
          }

          if (response.data.indexOf('failed') >= 0) {
            popupInfo = {
              text: `${Popup.get(response.data)}`
            }
          } else {
            popupInfo = {
              text: `${Popup.get(response.data)}，返回登入頁`,
              onOk: () => {
                vueModel.$router.replace({ name: 'Auth' })
              }
            }
          }
          vueModel.$modal.show(popupInfo)
        }
      }
    }
  }
</script>

<style lang="less">
  @import '../static/less/modal.less';
  @import '../static/less/global.less';

  .margin-top {
    margin-top: 20px;
  }

  .login-block {
    width: 500px
  }
</style>