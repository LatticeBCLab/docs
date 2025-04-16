<template>
  <div class="container">
    <h2>验证码生成器</h2>
    <input
        type="password"
        v-model="password"
        placeholder="请输入密码"
        @keyup.enter="generateCode"
    />
    <button @click="generateCode">生成验证码</button>
    <div v-if="result" :class="{ error: isError }" class="result">
      {{ result }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const password = ref('');
const result = ref('');
const isError = ref(false);

async function generateVerificationCode(password) {
  // 获取当前分钟时间戳
  const minuteTimestamp = Math.floor(Date.now() / 1000 / 60);

  // 将分钟时间戳转换为8字节数组
  const timestampBytes = new ArrayBuffer(8);
  const view = new DataView(timestampBytes);
  view.setBigUint64(0, BigInt(minuteTimestamp), false);

  // 使用 Web Crypto API 进行 HMAC-SHA256
  const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(password),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
  );
  const hash = await crypto.subtle.sign('HMAC', key, timestampBytes);
  const hashArray = new Uint8Array(hash);

  // 取哈希值最后4字节并转换为整数
  const offset = hashArray[hashArray.length - 1] & 0x0F;
  const truncatedHash = new DataView(hashArray.buffer).getUint32(offset, false);

  // 生成6位验证码
  const code = truncatedHash % 1000000;

  // 确保验证码为6位，不足补0
  return code.toString().padStart(6, '0');
}

async function generateCode() {
  if (!password.value) {
    result.value = '请输入密码！';
    isError.value = true;
    return;
  }

  try {
    const code = await generateVerificationCode(password.value);
    result.value = `验证码: ${code}`;
    isError.value = false;
  } catch (error) {
    result.value = `生成验证码失败: ${error.message}`;
    isError.value = true;
  }
}
</script>

<style scoped>
.container {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  margin: 20px auto;
}

input {
  padding: 10px;
  margin: 10px 0;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.result {
  margin-top: 20px;
  font-size: 1.2em;
  color: #333;
}

.result.error {
  color: red;
}
</style>