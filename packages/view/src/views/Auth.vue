<template>
  <section>
    <mu-flex class="margin-top" justify-content="center">
      <img src="../static/img/sun.png">
    </mu-flex>
    <mu-flex justify-content="center">
      <h1 class="margin-top main-title">雙北桃天氣即時資訊</h1>
    </mu-flex>
    <mu-flex class="margin-top" justify-content="center">
      <mu-form class="login-block" ref="login" :model="loginInfo">
        <mu-form-item label="帳號" prop="account" :rules="accountRules">
          <mu-text-field v-model="loginInfo.account" prop="account"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="密碼" prop="password" :rules="passwordRules">
          <mu-text-field type="password" v-model="loginInfo.password" prop="password"></mu-text-field>
        </mu-form-item>
        <mu-form-item>
          <mu-button color="primary" @click="submit">登入</mu-button>
          <mu-button color="info" @click="register">註冊帳號</mu-button>
        </mu-form-item>
      </mu-form>
    </mu-flex>
    <mu-flex class="margin-top" justify-content="center">
      <mu-circular-progress v-show="isLoading" :stroke-width="5" :size="50"></mu-circular-progress>
    </mu-flex>
  </section>
</template>

<script>
  import { popup } from '@/modules/message-text'

  export default {
    name: 'Auth',
    data () {
      return {
        isLoading: false,
        loginInfo: {
          account: '',
          password: ''
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
      }
    },

    methods: {
      async submit () {
        const vueModel = this
        let result
        vueModel.isLoading = true
        result = await vueModel.$refs.login.validate()
        if (result === true) {
          const response = await vueModel.$axios({
            method: 'post',
            url: 'http://localhost:8080/api/login',
            data: {
              account: vueModel.loginInfo.account,
              password: vueModel.loginInfo.password
            }
          })

          vueModel.isLoading = false
          vueModel.$modal.show({
            text: `${popup.get(response.data)}`,
            onOk: () => {
              vueModel.$router.replace(
                {
                  name: 'Weather'
                }
              )
            }
          })
        }
      },

      register () {
        const vueModel = this
        vueModel.$router.replace(
          {
            name: 'Register'
          }
        )
      }
    }
  }
</script>

<style lang="less">
  @import '../static/less/global.less';
  @import '../static/less/modal.less';

  .margin-top {
    margin-top: 20px;
  }

  .login-block {
    width: 500px
  }
</style>