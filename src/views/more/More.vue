<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import contact from '@/assets/images/email.png'
const route = useRoute()

const navbarTitle = ref("") // navbar标题

onMounted(() => {
  navbarTitle.value = route.meta.title
})
</script>

<template>
  <div class="more-container">
    <van-nav-bar
      :title="navbarTitle"
      safe-area-inset-top
    ></van-nav-bar>
    <section>
      <van-cell
        title="我的收藏"
        icon="like"
        is-link
      />
      <van-cell
        title="浏览记录"
        icon="clock"
        is-link
      />
    </section>
    <section>
      <van-cell
        title="陛下，赏个好评吧"
        icon="good-job"
        is-link
      />
      <van-cell
        title="联系我们"
        is-link
        class="contact"
      >
        <template #icon>
          <van-icon :name="contact" />
        </template>
      </van-cell>
    </section>
  </div>
</template>

<style scoped lang="scss">
.contact {
  .van-icon {
    display: flex;
    align-items: center;
    padding-right: 4px;
  }
}

:deep(.van-icon:before) {
  color: #dfe1e2 !important;
}

section {
  margin: 10px 0;

  .van-cell:first-child {
    margin-bottom: 1px solid #ccc;
  }
}
</style>