<script setup>
import DefaultTheme from 'vitepress/theme'
import VersionSwitcher from '../components/VersionSwitcher.vue'
import CustomerService from '../components/CustomerService.vue'
import { useRoute, useData } from 'vitepress'
const { page } = useData()
import { computed } from 'vue'

const { Layout } = DefaultTheme
const route = useRoute()

// 判断当前页面是否是配置文档页面
const isConfigPage = computed(() => {
  return /\/source\/configs\/v\d+\.\d+\/(genesis|config)\.md/.test(route.path)
})
</script>

<template>
  <Layout>
    <template #doc-before>
      <VersionSwitcher v-if="isConfigPage" />
    </template>
    <!-- 客服聊天组件 -->
    <template #layout-bottom>
      <CustomerService />
    </template>
  </Layout>
</template>