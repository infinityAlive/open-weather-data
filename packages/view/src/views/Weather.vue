<template>
  <section>
    <mu-appbar style="width: 100%;" color="primary">
      北北桃天氣資訊
      <mu-button flat slot="right">登出</mu-button>
    </mu-appbar>
    <article>
      <mu-container>
        <mu-flex justify-content="center">
          <mu-card style="max-width: 330px; margin: 20px 10px;"
                   v-for="cityWeatherInfo of citiesWeatherInfo" key="cityWeatherInfo.city">
            <mu-card-header :title="`${cityWeatherInfo.startTime}~${cityWeatherInfo.endTime}`">
            </mu-card-header>
            <mu-card-media :title="cityWeatherInfo.city"
                           :sub-title="cityWeatherInfo.desc">
              <img :src="determineCityImage (cityWeatherInfo.city)">
            </mu-card-media>
            <mu-card-title :title="`溫度 ${cityWeatherInfo.minTemperature} ~ ${cityWeatherInfo.maxTemperature}`"
                           :sub-title="`降雨機率 ${cityWeatherInfo.rainProbability}`"></mu-card-title>
            <mu-card-text>
<!--              <mu-list>-->
<!--                各地區-->
<!--                <mu-list-item button :ripple="false">-->
<!--                  <mu-list-item-action>-->
<!--                    地區-->
<!--                  </mu-list-item-action>-->
<!--                  <mu-list-item-title>溫度 30 度 C</mu-list-item-title>-->
<!--                  <mu-list-item-title>濕度 30 %</mu-list-item-title>-->
<!--                </mu-list-item>-->
<!--              </mu-list>-->
            </mu-card-text>
          </mu-card>
        </mu-flex>
      </mu-container>
    </article>
  </section>


</template>

<script>
  import { popup } from '@/modules/message-text'

  export default {
    name: 'Weather',
    data () {
      return {
        citiesWeatherInfo: [],
        isLoading: false,
      }
    },

    async mounted () {
      const vueModel = this
      let citiesWeatherInfoResponse, areasWeatherInfoResponse
      citiesWeatherInfoResponse = await vueModel.$axios({
        method: 'get',
        url: `http://localhost:8080/api/weather/cities`
      })

      vueModel.citiesWeatherInfo = citiesWeatherInfoResponse.data
      areasWeatherInfoResponse = await vueModel.$axios({
        method: 'get',
        url: `http://localhost:8080/api/weather/areas`
      })
      vueModel.areasWeatherInfo = areasWeatherInfoResponse.data
    },

    methods: {
      logout () {

      },

      determineCityImage (city) {
        switch (city) {
          case '臺北市':
            return require('@/static/img/taipei.jpg')

          case '新北市':
            return require('@/static/img/new-taipei.jpg')

          case '桃園市':
            return require('@/static/img/taoyuan.jpg')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../static/less/global.less';
  @import '../static/less/modal.less';

  .city-card {
    max-width: 330px;
    margin-top: 20px;
  }

  .login-block {
    width: 500px
  }
</style>