<template>
  <div class="weather-wrap">
    <div class="item" v-for="item in Object.keys(WeatherJson)">
      <img :src="WeatherJson[item]" :alt="item" />
      <div>{{ item }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import WeatherJson from './weather.json';
  // 天气现象有晴、多云、阴、阵雨、雷阵雨、雷阵雨伴有冰雹、
  // 雨夹雪、小雨、中雨、大雨、暴雨、大暴雨、特大暴雨、阵雪、
  // 小雪、中雪、大雪、暴雪、雾、冻雨。 沙尘暴、小到中雨、
  // 中到大雨、大到暴雨、暴雨到大暴雨、大暴雨到特大暴雨、
  // 小到中雪、 中到大雪、大到暴雪、浮尘、扬沙、强沙尘暴、霾。

  //  以下数据来自中国气象局
  //  晴 clear
  //  阴天 cloudy day
  //  炎热 scorching heat
  //  闷热天气 muggy weather
  //  反常天气 freakish weather
  //  虹 rainbow
  //  雾 fog
  //  凉 cool
  //  霜 frost
  //  露 dew
  //  雪 snow
  //  雹 hail
  //  雷 thunder
  //  冰 ice
  //  雪堆 snowdrift
  //  雪花 snow flake
  //  闪电 lightning
  //  零度 zero
  //  寒冷 chilly
  //  冰点 freezing point
  //  冰柱 icicle
  //  地形雨 local rains
  //  雨量 rainfall
  //  雨季 rainy season
  //  雨点 raindrops
  //  间歇雨 intermittent rain
  //  大雨 heavy rain
  //  甘霖 welcome rain
  //  滂沱大雨 downpour
  //  风级 wind scale
  //  气压 barometric pressure
  //  气团 air mass
  //  风眼 eye of a storm
  //  气旋 cyclone
  //  低气压 low-pressure
  //  高气压 high-pressure
  //  锋面 frontal edge
  //  暖锋 warm front
  //  冷峰 cold front
</script>
<style lang="scss" scoped>
  .weather-wrap {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 16px;
    margin-top: 32px;
    .item {
      text-align: center;
      img {
        margin: 0 auto 8px;
      }
    }
  }
  @media (max-width: 640px) {
    .weather-wrap {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
