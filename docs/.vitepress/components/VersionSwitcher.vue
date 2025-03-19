<template>
  <div class="version-switcher">
    <span class="version-label">{{ label || '版本选择：' }}</span>
    <div class="version-options">
      <a
        v-for="version in versions"
        :key="version.name"
        :href="version.link"
        class="version-option"
        :class="{ active: version.name === currentVersion }"
      >
        {{ version.name }}
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  // 当前版本名称
  currentVersion: {
    type: String,
    required: true
  },
  // 所有版本列表
  versions: {
    type: Array,
    required: true,
    // 每个版本对象包含 {name, link}
  },
  // 自定义标签文本
  label: {
    type: String,
    default: '版本选择：'
  }
})
</script>

<style>
.version-switcher {
  display: flex;
  align-items: center;
  margin: 24px 0;
  padding: 12px 16px;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-brand);
}

.version-label {
  font-weight: 500;
  margin-right: 16px;
  white-space: nowrap;
}

.version-options {
  display: flex;
  gap: 8px;
}

.version-option {
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.2s ease;
}

.version-option:hover {
  background-color: var(--vp-c-brand-dimm);
  border-color: var(--vp-c-brand-light);
}

.version-option.active {
  background-color: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}
</style>