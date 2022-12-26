<script setup>
import { useRouter } from 'vue-router';
import Swiper from './components/Swiper.vue'
import Searchbar from '@/components/Searchbar.vue'
import Hotcate from './components/Hotcate.vue';
import FineDish from './components/FineDish.vue';

const router = useRouter()

const handleSearch = () => {
  router.push('/search')
}
</script>

<template>
  <div class="cookbook-container">
    <Swiper></Swiper>
    <Searchbar
      outerBg="#f5f5f5"
      innerBg="#fff"
      :border="true"
      @search="handleSearch"
    ></Searchbar>
    <Hotcate></Hotcate>
    <FineDish></FineDish>
  </div>
</template>

<style scoped lang="">

</style>