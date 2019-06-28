<template>
  <section>
    <mu-appbar style="width: 100%;" color="primary">
      {{ account}} 您好，目前北北桃天氣資訊如下：
      <mu-button flat slot="right" @click="logout">登出</mu-button>
    </mu-appbar>
    <article>
      <mu-container>
        <mu-flex justify-content="center">
          <mu-card style="max-width: 330px; margin: 20px 10px;"
                   v-for="cityWeatherInfo in citiesWeatherInfo" :key="cityWeatherInfo.city">
            <mu-card-header :title="`${cityWeatherInfo.startTime}~${cityWeatherInfo.endTime}`">
            </mu-card-header>
            <mu-card-media :title="cityWeatherInfo.city"
                           :sub-title="cityWeatherInfo.desc">
              <img :src="determineCityImage (cityWeatherInfo.city)">
            </mu-card-media>
            <mu-card-title :title="`溫度 ${cityWeatherInfo.minTemperature} ~ ${cityWeatherInfo.maxTemperature}度 C`"
                           :sub-title="`降雨機率 ${cityWeatherInfo.rainProbability}`"></mu-card-title>
            <mu-card-text>
              {{ cityWeatherInfo.city }} 各天氣站即時資訊 (每小時更新)
              <mu-list>
                <mu-list-item v-for="area of cityWeatherInfo.areas" :key="area['_id']">
                  <mu-col>
                    <mu-list-item-action>
                      <div class="area-subtitle">{{ area['_id'] }}</div>
                    </mu-list-item-action>
                  </mu-col>
                  <mu-col>
                    <mu-list-item-content>
                      <mu-list-item-title>{{ area.TEMP }} 度Ｃ - 濕度 {{ parseInt(area.HUMD * 100) }}%</mu-list-item-title>
                    </mu-list-item-content>
                  </mu-col>
                </mu-list-item>
              </mu-list>
            </mu-card-text>
          </mu-card>
        </mu-flex>
      </mu-container>
    </article>
  </section>


</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Weather',
    data () {
      return {
        citiesWeatherInfo: [],
        isLoading: false,
      }
    },

    computed: {
      ...mapState('accountInfo', ['account']),
    },

    async mounted () {
      const vueModel = this
      vueModel.$axios
        .all([
          vueModel.$axios.get('/api/weather/cities'),
          vueModel.$axios.get('/api/weather/areas')
        ])
        .then(vueModel.$axios.spread(
          (citiesWeatherInfoResponse, areasWeatherInfoResponse) => {
            const citiesWeatherInfo = citiesWeatherInfoResponse.data
            citiesWeatherInfo.forEach(
              cityWeatherInfo => {
                cityWeatherInfo.areas = areasWeatherInfoResponse.data
                  .filter(areaWeatherInfo => areaWeatherInfo.city === cityWeatherInfo.city)
              }
            )
            vueModel.citiesWeatherInfo = citiesWeatherInfo
          })
        )
    },

    methods: {
      logout () {
        const vueModel = this
        if (window.localStorage) {
          window.localStorage.removeItem('token')
          vueModel.$router.replace(
            {
              name: 'Auth'
            }
          )
        }
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

  .area-subtitle {
    font-size: 15px;
    font-weight: 800;
    color: #17233d;
    margin-right: 10px;
    margin-left: -20px;
  }
</style>