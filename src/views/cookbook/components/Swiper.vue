<script setup>
import { onMounted } from 'vue'
import useListStore from '@/store/listStore';

const listStore = useListStore()
console.log(listStore);
onMounted(() => {

})
</script>

<template>
  <div class="swiper-container">
    <van-swipe
      :autoplay="3000"
      indicator-color="white"
    >
      <van-swipe-item
        v-for="swiper in listStore.filteredList(5)"
        :key="swiper.id"
      >
        <img
          :src="swiper.img"
          :alt="swiper.name"
        >
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<style scoped lang="scss">
.swiper-container {
  height: 0;
  font-size: 0;
  padding-bottom: 66.67%;
}

.van-swipe-item {
  img {
    width: 100%;
  }
}
</style>