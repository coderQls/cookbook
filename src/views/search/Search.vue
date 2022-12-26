<script setup>
import { ref } from 'vue'
import useListStore from '@/store/listStore'

const keyword = ref('')
const listStore = useListStore()
const filteredList = ref(listStore.list)
const pageNum = ref(1)
const pageSize = 10
const list = ref(filteredList.value.slice(0, pageNum.value * pageSize))
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const onClickLeft = () => {
  history.back()
}

const onClickRight = () => {
  const regexp = new RegExp(keyword.value, 'i')
  filteredList.value = listStore.list.filter((item) => {
    return regexp.test(item.name) || regexp.test(item.burdens)
  })
  list.value = filteredList.value.slice(0, pageNum.value * pageSize)
}

const onLoad = () => {
  setTimeout(() => {
    if (refreshing.value) {
      list.value = [];
      pageNum.value = 0;
      refreshing.value = false;
    }
    pageNum.value += 1
    list.value = filteredList.value.slice(0, pageNum.value * pageSize)
    loading.value = false;

    if (pageNum.value * pageSize >= filteredList.value.length) {
      finished.value = true;
    }
  }, 1000);
};

const onRefresh = () => {
  // 清空列表数据
  finished.value = false;

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};
</script>

<template>
  <div class="search-container">
    <van-nav-bar
      left-arrow
      right-text="搜索"
      safe-area-inset-top
      fixed
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #title>
        <van-search
          v-model="keyword"
          placeholder="红烧肉"
          clearable
        />
      </template>
    </van-nav-bar>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
    >
      <van-list
        class="list-wrapper"
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          class="item-wrapper"
          v-for="item in list"
        >
          <img
            :src="item.img"
            alt="img.name"
          >
          <div class="info">
            <div class="title">{{ item.name }}</div>
            <div class="intro">{{ item.burdens }}</div>
            <div>
              <span class="views">{{ item.all_click }}浏览</span>
              <span class="favorites">{{ item.favorites }}收藏</span>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/style/border.scss';

.search-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.van-nav-bar {
  :deep(.van-nav-bar__right) {
    font-size: 22px;
  }
}

.van-search {
  background-color: #ff5600;
}

.van-pull-refresh {
  margin-top: 46px;
  overflow-y: auto;
}

:global(:root) {
  --van-search-input-height: 26px;
  --van-nav-bar-arrow-size: 32px;
  --van-nav-bar-text-color: #fff;
  --van-nav-bar-icon-color: #fff;
}

.list-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px 10px;

  .item-wrapper {
    height: 96px;
    display: flex;
    align-items: center;

    &:not(:last-child) {
      @include border(0 0 1px 0);
    }

    img {
      width: 111px;
      height: 74px;
      margin-right: 15px;
    }

    .info {
      width: calc(100% - 146px);
      height: 70px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .title {
        font-size: 22px;
        color: #666;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .intro {
        font-size: 16px;
        color: #999;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      span {
        font-size: 12px;
        color: #999;
      }

      .views {
        margin-right: 12px;
      }
    }
  }
}
</style>