<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const hotcate = ref([])

onMounted(async () => {
  const result = await axios.get('http://localhost:8080/hotcat')
  hotcate.value = [
    ...result.data,
    {
      title: '更多...'
    }
  ]
})
</script>

<template>
  <van-grid
    :column-num="4"
    :border="false"
  >
    <van-grid-item
      v-for="item in hotcate"
      :key="item"
    >
      <van-image :src="item.img"></van-image>
      <span>{{ item.title }}</span>
    </van-grid-item>
  </van-grid>
</template>

<style scoped lang="scss">
.van-image {
  >img {
    border-radius: 5px;
  }

  :deep(.van-icon) {
    display: none;
  }
}
</style>