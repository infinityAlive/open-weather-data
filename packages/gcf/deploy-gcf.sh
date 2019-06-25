#!/usr/bin/env bash
gulp packageToGcf
gcloud config set project infinity2015
gcloud functions deploy updatingWeather \
  --region asia-east2 \
  --source './dist' \
  --trigger-http \
  --entry-point updatingWeather \
  --memory 128 \
  --runtime nodejs8