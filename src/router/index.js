import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/cookbook'
  },
  {
    path: '/cookbook',
    component: () => import('@/views/cookbook/Cookbook.vue'),
    meta: {
      title: '菜谱大全',
      isTab: true,
    }
  },
  {
    path: '/category',
    component: () => import('@/views/category/Category.vue'),
    meta: {
      title: '分类',
      isTab: true,
    }
  },
  {
    path: '/more',
    component: () => import('@/views/more/More.vue'),
    meta: {
      title: '更多',
      isTab: true,
    }
  },
  {
    path: '/search',
    component: () => import('@/views/search/Search.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router