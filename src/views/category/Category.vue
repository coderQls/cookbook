<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router'
import axios from 'axios';
import Searchbar from '@/components/Searchbar.vue'

const router = useRouter()
const tabs = [
  {
    id: 'category',
    name: '分类'
  },
  {
    id: 'material',
    name: '食材'
  }
]
const activeNavtab = ref('category')
const activeSidetab = ref(0)
const categoryList = ref([])
const materialList = ref([])

const sidetabList = computed(() => {
  return activeNavtab.value === 'category' ? categoryList.value : materialList.value
})

const detailList = computed(() => {
  return sidetabList.value[activeSidetab.value] && sidetabList.value[activeSidetab.value][1]
})

const handleNavtabClick = (tab) => {
  activeNavtab.value = tab
  activeSidetab.value = 0
}

const handleSearch = () => {
  router.push('/search')
}

onMounted(async () => {
  const result = await axios.get('http://localhost:8080/category')
  const data = result.data.data
  categoryList.value = Object.entries(data.category)
  materialList.value = Object.entries(data.material)
})


</script>

<template>
  <div class="category-container">
    <van-nav-bar safe-area-inset-top>
      <template #title>
        <div class="tab-wrapper">
          <div
            v-for="tab in tabs"
            :key="tab.id"
            class="tab-item"
            :class="{ active: activeNavtab === tab.id }"
            @click="handleNavtabClick(tab.id)"
          >{{ tab.name }}</div>
        </div>
      </template>
    </van-nav-bar>
    <Searchbar
      innerBg="#efefef"
      @search="handleSearch"
    ></Searchbar>
    <main class="category-main">
      <van-sidebar v-model="activeSidetab">
        <van-sidebar-item
          v-for="item in sidetabList"
          :key="item"
          :title="item[0]"
        />
      </van-sidebar>
      <ul class="list-wrapper">
        <li
          v-for="item in detailList"
          :key="item"
          class="item"
        >
          {{ item }}
        </li>
      </ul>
    </main>
  </div>
</template>

<style scoped lang="scss">
.category-container {
  height: 100%;
  display: flex;
  flex-direction: column;

  .category-main {
    flex: 1;
    display: flex;
    overflow: auto;

    .list-wrapper {
      height: 100%;
      overflow: auto;
      flex: 1;
      padding: 20px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(auto-fill, 60px);
      box-sizing: border-box;
    }
  }
}

.tab-wrapper {
  width: 144px;
  height: 30px;
  border-radius: 15px;
  border: 1px solid #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .tab-item {
    width: 72px;
    height: 30px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;

    &.active {
      background-color: #fff;
      color: #ff5600;
    }
  }
}
</style>