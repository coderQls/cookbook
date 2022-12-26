<script setup>
import searchIcon from '@/assets/images/search.png'

defineProps(['outerBg', 'innerBg', 'border'])
const emits = defineEmits(['search'])

</script>

<template>
  <div
    class="searchbar-container"
    :style="{ backgroundColor: outerBg }"
  >
    <div
      class="search-wrap"
      :class="{ border: border }"
      :style="{ backgroundColor: innerBg }"
      @click="emits('search')"
    >
      <img
        class="search-icon"
        :src="searchIcon"
        alt=""
      >
      <span class="placeholder">想吃什么搜这里，比如：川菜</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/style/border.scss';

.searchbar-container {
  padding: 10px 15px;

  .search-wrap {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    &.border {
      @include border(1px, solid, #ee7530, 5px);
    }

    .search-icon {
      width: 20px;
    }

    .placeholder {
      font-size: 12px;
    }
  }
}
</style>