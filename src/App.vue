<script setup>
import { ref, watch, onMounted } from "vue"
import { useRoute } from 'vue-router'
import useListStore from '@/store/listStore'

import cookbookActive from "@/assets/images/cookbook-active.png"
import cookbook from "@/assets/images/cookbook.png"
import menuActive from "@/assets/images/menu-active.png"
import menu from "@/assets/images/menu.png"
import moreActive from "@/assets/images/more-active.png"
import more from "@/assets/images/more.png"

const tabs = [
  {
    title: "菜谱大全",
    active: cookbookActive,
    inactive: cookbook,
    to: "/cookbook",
  },
  {
    title: "分类",
    active: menuActive,
    inactive: menu,
    to: "/category",
  },
  {
    title: "更多",
    active: moreActive,
    inactive: more,
    to: "/more",
  },
]

const route = useRoute()
const active = ref(0) // 当前激活tabbar
const navbarTitle = ref("") // navbar标题
const isTab = ref(false) // 是否为tabbar项
const listStore = useListStore()

// 切换navbar
const handleTabbarChange = (active) => {
  navbarTitle.value = tabs[active].title
}

watch(route, (route) => {
  navbarTitle.value = route.meta.title
  isTab.value = route.meta.isTab || false
})

onMounted(async () => {
  await listStore.loadData()
})
</script>

<template>
  <div class="main-container">
    <main>
      <router-view></router-view>
    </main>
    <van-tabbar
      v-if="isTab"
      v-model="active"
      active-color="#000"
      inactive-color="#ccc"
      safe-area-inset-bottom
      :fixed="false"
      route
      @change="handleTabbarChange"
    >
      <van-tabbar-item
        v-for="(item, index) in tabs"
        :key="index"
        :to="item.to"
      >
        <span>{{ item.title }}</span>
        <template #icon="props">
          <img :src="props.active ? item.active : item.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped lang="scss">
.main-container {
  height: 100%;
  display: flex;
  flex-direction: column;

  main {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
