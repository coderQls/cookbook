<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router';
import Swiper from './components/Swiper.vue'
import Searchbar from '@/components/Searchbar.vue'
import Hotcate from './components/Hotcate.vue';
import FineDish from './components/FineDish.vue';

const route = useRoute()
const router = useRouter()
const navbarTitle = ref("") // navbar标题

const handleSearch = () => {
  router.push('/search')
}

onMounted(() => {
  navbarTitle.value = route.meta.title
})

</script>

<template>
  <div class="cookbook-container">
    <van-nav-bar
      :title="navbarTitle"
      safe-area-inset-top
    ></van-nav-bar>
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