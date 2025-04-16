<template>
  <div class="container">
    <input
        type="text"
        v-model="password"
        placeholder="请输入密码"
        @keyup.enter="generateCode"
    />
    <br />
    <label>
      <input type="checkbox" v-model="useCustomTime" />
      选择时间
    </label>
    <br />
    <input
        v-if="useCustomTime"
        type="datetime-local"
        v-model="customTime"
        step="60"
    />
    <br />
    <button @click="generateCode">生成验证码</button>
    <div v-if="result" :class="{ error: isError }" class="result">
      {{ result }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CryptoJS from 'crypto-js';

const password = ref('');
const useCustomTime = ref(false);
const customTime = ref('');
const result = ref('');
const isError = ref(false);
const precision = 120
async function generateVerificationCode(password, minuteTimestamp) {
  // 将分钟时间戳转换为8字节数组
  const timestampBytes = new ArrayBuffer(8);
  const view = new DataView(timestampBytes);
  view.setBigUint64(0, BigInt(minuteTimestamp), false);

  // 将 ArrayBuffer 转换为 WordArray（crypto-js 使用的格式）
  const buffer = new Uint8Array(timestampBytes);
  const wordArray = CryptoJS.lib.WordArray.create(buffer);

  // 使用 crypto-js 进行 HMAC-SHA256
  const hash = CryptoJS.HmacSHA256(wordArray, password);
  const hashArray = new Uint8Array(
      hash.words.reduce((bytes, word, i) => {
        const offset = i * 4;
        bytes[offset] = (word >>> 24) & 0xff;
        bytes[offset + 1] = (word >>> 16) & 0xff;
        bytes[offset + 2] = (word >>> 8) & 0xff;
        bytes[offset + 3] = word & 0xff;
        return bytes;
      }, new Uint8Array(hash.words.length * 4))
  );


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

  let minuteTimestamp;
  if (useCustomTime.value) {
    if (!customTime.value) {
      result.value = '请选择自定义时间！';
      isError.value = true;
      return;
    }
    // 将选择的时间转换为分钟级时间戳
    const selectedDate = new Date(customTime.value);
    minuteTimestamp = Math.floor(selectedDate.getTime() / 1000 / precision);
  } else {
    // 使用当前分钟时间戳
    minuteTimestamp = Math.floor(Date.now() / 1000 / precision);
  }

  try {
    const code = await generateVerificationCode(password.value, minuteTimestamp);
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

input[type="text"],
input[type="datetime-local"] {
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