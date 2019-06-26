# open-weather-data
定期呼叫中央氣象局 api，呈現氣象資訊。


# view

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



## 後端 api 部署至 GCP K8S

> 在 `GCP` 建立專案與 `K8S` 叢集後，將 `docker image` 部署至 `GCP` 的 `Container Registry`

```bash
# 設定 GCP 專案
gcloud config set project infinity2015

# 設定 GCP 區域(台灣)
gcloud config set compute/zone asia-east1-a

# 建置 docker image
docker build --tag gcr.io/infinity2015/open-weather-data:0.0.01

# push docker image 至 Container Registry


# 
kubectl run open-weather-data --image=gcr.io/infinity2015/open-weather-data:0.0.01 --port 8080

kubectl expose deployment open-weather-data --type=LoadBalancer --port 80 --target-port 8080

```


