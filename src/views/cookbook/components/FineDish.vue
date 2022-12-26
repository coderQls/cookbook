<script setup>
import useListStore from '@/store/listStore'

const listStore = useListStore()
</script>

<template>
  <div class="finedish-container">
    <h2 class="finedish-title">精品好菜</h2>
    <ul class="list-wrapper">
      <li
        class="item-wrapper"
        v-for="item in listStore.filteredList(10)"
      >
        <img
          :src="item.img"
          :alt="item.name"
        >
        <div class="info">
          <div class="title">{{ item.name }}</div>
          <div>
            <span class="favorites">{{ item.favorites }}收藏</span>
            <span class="views">{{ item.all_click }}浏览</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.finedish-container {
  padding: 10px;
}

.finedish-title {
  font-size: 22px;
  color: #999;
  font-weight: normal;
}

.list-wrapper {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;

  .item-wrapper {
    width: calc(50% - 5px);
    margin-right: 10px;
    margin-bottom: 10px;
    box-sizing: border-box;

    &:nth-child(2n) {
      margin-right: 0;
    }

    img {
      width: 100%;
    }

    .info {
      border-color: #fff;
      padding: 5px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .title {
        font-size: 22px;
      }

      span {
        font-size: 12px;

        &.favorites {
          margin-right: 6px;
        }
      }
    }
  }
}
</style>