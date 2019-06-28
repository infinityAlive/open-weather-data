# open-weather-data

透過 `GCP` 的 `Cloud Scheduler` 執行 `GCF` 定期呼叫 中央氣象局 `API`，儲存氣象資訊。

> 1. 所有服務都是用 `JS` 撰寫，後端是 `Node.js`，前端是 `Vue.js`
> 2. `GCF` 為 `Google Cloud Function` 的 `Severless` 服務，可直接部署 `API` 於 `GCF` 中。
> 3. 資料儲存於 `MongoDb`

![](https://i.imgur.com/F8LDplZ.gif)

## gcf 目錄
主要是撰寫 `API`，此 `API` 在內部會再呼叫中央氣象局的兩個 `API`：    
- 一般天氣預報-今明 36 小時天氣預報，主要針對城市，氣象局每 6 小時更新資料
- 自動氣象站資料-無人自動站氣象資料，單位為地區氣象站，每小時更新資料

結合這兩 `API` 內容便可在每小時定期擷取北北桃的天氣資訊。

## view 目錄

前端網站連結：[北北桃天氣即時資訊](https://infinityalive.github.io/open-weather-data/#/auth)
> 運用 `github page` 存放靜態資源。

用 `Vue.js` 呈現靜態網頁，採前後端分離的單頁式應用，後端 `API` 於 [open-weather-data-api](https://github.com/infinityAlive/open-weather-data-api) `Repository` 中。
> 網站的圖片是免費授權，而城市的照片則都是我在當地拍攝的。