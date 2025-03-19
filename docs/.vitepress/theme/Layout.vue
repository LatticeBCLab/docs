<script setup>
import DefaultTheme from 'vitepress/theme'
import VersionSwitch from './components/VersionSwitch.vue'
import { useRoute，useData } from 'vitepress'
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
      <VersionSwitch v-if="isConfigPage" />
    </template>
  </Layout>
</template>