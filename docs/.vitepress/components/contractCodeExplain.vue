<template>
  <div class="contract-code-explainer">
    <h3>合约状态验证工具</h3>
    
    <div class="state-display">
      <div class="code-label">当前状态 (state): <span class="state-explanation">{{ getStateExplanation() }}</span></div>
      <div class="binary-visualization">
        <div 
          v-for="(bit, index) in stateBits" 
          :key="index" 
          class="bit-box"
          :class="{ active: bit === '1' }"
        >
          <div class="bit-value">{{ bit }}</div>
          <div class="bit-position">{{ 7-index }}</div>
        </div>
      </div>
    </div>
    
    <div class="rule-selection">
      <div class="code-label">选择规则 (rule):</div>
      <div class="rule-options">
        <label v-for="(option, index) in ruleOptions" :key="index">
          <input 
            type="radio" 
            name="rule" 
            :value="index" 
            v-model="selectedRule"
            @change="updateRule"
          />
          contractFreezeRule:{{ index }}
        </label>
      </div>
      <div class="binary-visualization">
        <div 
          v-for="(bit, index) in ruleBits" 
          :key="index" 
          class="bit-box"
          :class="{ active: index === 1 }"
        >
          <div class="bit-value">{{ bit }}</div>
          <div class="bit-position">{{ 8-index }}</div>
        </div>
      </div>
    </div>
    
    <div class="op-input">
      <div class="code-label">操作码 (op):</div>
      <div class="op-bits-input">
        <div class="editable-bits">
          <div 
            v-for="i in 4" 
            :key="i" 
            class="bit-input"
          >
            <select v-model="opEditableBits[i-1]" @change="updateOp(i)" :disabled="i === 1">
              <option value="0">0</option>
              <option value="1">1</option>
            </select>
            <div class="bit-position">{{ 8-i }}</div>
          </div>
        </div>
        <div class="fixed-bits">
          <span>固定部分: 0100</span>
          <div class="bit-positions">
            <span>3</span>
            <span>2</span>
            <span>1</span>
            <span>0</span>
          </div>
        </div>
      </div>
      <div class="binary-visualization">
        <div 
          v-for="(bit, index) in opBits" 
          :key="index" 
          class="bit-box"
          :class="{ active: bit === '1' }"
        >
          <div class="bit-value">{{ bit }}</div>
          <div class="bit-position">{{ 7-index }}</div>
        </div>
      </div>
    </div>
    
    <div class="formula-display">
      <div class="code-label">验证表达式:</div>
      <div class="formula">
        (state|rule|(op>>7&lt;&lt;7)) &amp;(op|10000000) >>4 == op|10000000 >>4
      </div>
    </div>
    
    <div class="action-section">
      <button @click="executeOperation" class="action-button">{{ freezeButtonText }}</button>
    </div>
    
    <div v-if="showResult" class="result-section">
      <div class="expression-result">
        <div class="expression-text">表达式①结果:</div>
        <div class="expression-value">{{ expressionResult ? '不需要投票' : '需要投票' }}</div>
        <div class="emoji">{{ expressionResult ? '😊' : '😞' }}</div>
      </div>
      
      <div class="state-update">
        <div class="update-text">状态已更新:</div>
        <div class="binary-visualization">
          <div 
            v-for="(bit, index) in stateBits" 
            :key="index" 
            class="bit-box"
            :class="{ active: bit === '1' }"
          >
            <div class="bit-value">{{ bit }}</div>
            <div class="bit-position">{{ 7-index }}</div>
          </div>
        </div>
      </div>
      
      <div v-if="debugInfo" class="debug-info">
        <details>
          <summary>调试信息</summary>
          <pre>{{ debugInfo }}</pre>
        </details>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// 状态变量
const state = ref('00110000');
const rule = ref('000000000');
const op = ref('00000100');
const selectedRule = ref(0);
const opEditableBits = ref(['0', '0', '0', '0']); // 用户可编辑的op位 (第6-4位)
const showResult = ref(false);
const expressionResult = ref(false);
const debugInfo = ref('');

// 规则选项
const ruleOptions = [
  '0', // 选项0
  '1', // 选项1
  '2'  // 选项2
];

// 计算属性
const stateBits = computed(() => state.value.split(''));
const ruleBits = computed(() => rule.value.split(''));
const opBits = computed(() => op.value.split(''));

const freezeButtonText = computed(() => {
  // 根据当前状态判断是冻结还是解冻
  return state.value.charAt(5) === '1' ? '解冻' : '冻结';
});

// 获取状态代码的解释
function getStateExplanation() {
  const stateInt = parseInt(state.value, 2);
  const explanations = [];
 
  // 检查权限位
  const permissions = [];
  if ((stateInt & 0x10) !== 0) permissions.push('owner');
  if ((stateInt & 0x20) !== 0) permissions.push('盟主');
  if ((stateInt & 0x40) !== 0) permissions.push('共识');
  
  // 检查各个状态位
  explanations.push('合约状态：');
  if ((stateInt & 0x04) !== 0) explanations.push('已冻结');
  if ((stateInt & 0x02) !== 0) explanations.push('升级中');
  if ((stateInt & 0x01) !== 0) explanations.push('部署中');
  if ((stateInt & 0x0F) === 0) explanations.push('可执行');

  if (permissions.length > 0) {
    explanations.push('，有特殊权限：' + permissions.join('、'));
  }
  
  return explanations.length > 0 ? explanations.join(' ') : '无特殊状态';
}

// 方法
function updateRule() {
  // 选择规则后左移7位
  const selectedOption = ruleOptions[selectedRule.value];
  const selectedOptionInt = parseInt(selectedOption, 10);
  const shiftedValue = selectedOptionInt << 7;
  rule.value = shiftedValue.toString(2).padStart(9, '0');
  console.log(rule.value);
}

function updateOp(index) {
  // 确保i=2,3,4中只能有一个的value是1
  console.log(index);
  const count = opEditableBits.value.slice(1, 4).filter(bit => bit === '1').length;
  console.log(count);
  if (count > 1) {
    for (let i = 2; i <= 4; i++) {
      if (i !== index) {
        console.log("i"+i);
        opEditableBits.value[i-1] = '0';
      }
    }
  }
  // 更新op，保持0-3位为0100
  if (opEditableBits.value[3] === '1') {
    opEditableBits.value[0] = '1';
  }else{
    opEditableBits.value[0] = '0';
  }
  op.value = opEditableBits.value.join('') + '0100';

}

function executeOperation() {
  // 执行表达式①验证: (state|rule|(op>>7<<7)) &(op|1000,0000) >>4 == op|1000,0000 >>4
  const stateInt = parseInt(state.value, 2);
  const ruleInt = parseInt(rule.value, 2);
  const opInt = parseInt(op.value, 2);
  // 检查opInt的高四位是否大于0
  const highFourBits = (opInt >> 4) & 0x0F;
  if (highFourBits === 0) {
    alert('操作码高四位不能全为0，请重新选择操作码');
    return;
  }
  // 表达式①的计算
  // 注意：在二进制表示中，位是从右到左编号的，即最右边是第0位
  // op>>7<<7 表示将op右移7位再左移7位，实际上是保留最高位，其他位置0
  const opShiftedRightAndLeft = (opInt >> 7) << 7; // 先右移7位，再左移7位，保留最高位
  const combinedState = stateInt | ruleInt | opShiftedRightAndLeft;
  
  // op|10000000 表示将op的第7位（最左位）设为1
  const opWithMSB = opInt | (1 << 7);
  // 右移4位
  const shiftedOpWithMSB = opWithMSB >> 4;
  
  // 左侧表达式: (state|rule|(op>>7<<7)) &(op|1000,0000) >>4
  // 先计算 (state|rule|(op>>7<<7))
  // 再与 ((op|1000,0000) >>4) 进行与操作
  const combinedState2 = combinedState & opWithMSB ;
  
  // 右侧表达式: (op|1000,0000) >>4
  const leftSide = combinedState2>> 4;
  const rightSide = shiftedOpWithMSB;
  
  // 验证表达式①
  expressionResult.value = (leftSide === rightSide);
  
  // 调试信息
  debugInfo.value = `
    表达式①: (state|rule|(op>>7<<7)) &(op|1000,0000) >>4 == op|1000,0000 >>4
    
    state: ${stateInt.toString(2).padStart(8, '0')}
    rule: ${ruleInt.toString(2).padStart(8, '0')}
    op: ${opInt.toString(2).padStart(8, '0')}
    op>>7: ${(opInt >> 7).toString(2).padStart(8, '0')}
    op>>7<<7: ${opShiftedRightAndLeft.toString(2).padStart(8, '0')}
    state|rule|(op>>7<<7): ${combinedState.toString(2).padStart(8, '0')}
    op|10000000: ${opWithMSB.toString(2).padStart(8, '0')}
    (state|rule|(op>>7<<7)) &(op|1000,0000): ${combinedState2.toString(2).padStart(8, '0')} 
    leftSide: ${leftSide.toString(2).padStart(8, '0')}
    (op|10000000)>>4: ${shiftedOpWithMSB.toString(2).padStart(8, '0')}
    左侧结果: ${leftSide.toString(2).padStart(8, '0')}
    右侧结果: ${rightSide.toString(2).padStart(8, '0')}
    表达式结果: ${expressionResult.value ? '成立' : '不成立'}
  `;
  
  // 更新状态: state = (op | (op<<1) & 0011) ^ (state&1111)
  // 注意：0011 二进制是 0x03，1111 二进制是 0x0F
  const shiftedOp = opInt << 1;
  const mergedOp = opInt | shiftedOp;
  const maskedShiftedOp = mergedOp & 0x34; // 00110100二进制
  const maskedState = stateInt & 0x0F; // 1111二进制
  var newState = maskedShiftedOp ^ maskedState;
  if (maskedState == 0x04){
    newState = 0x30;
    debugInfo.value += `
        新状态: ${newState.toString(2).padStart(8, '0')}
     `
  } else {
    debugInfo.value += `
    
    状态更新: ((op | (op<<1)) & 00110100) ^ (state&1111)
    
    op: ${opInt.toString(2).padStart(8, '0')}
    op<<1: ${shiftedOp.toString(2).padStart(8, '0')}
    op | ((op<<1): ${mergedOp.toString(2).padStart(8, '0')}
    (op | (op<<1)) & 00110100: ${maskedShiftedOp.toString(2).padStart(8, '0')}
    state&1111: ${maskedState.toString(2).padStart(8, '0')}
    新状态: ${newState.toString(2).padStart(8, '0')}
  `;
  }
  
  // 更新调试信息，添加状态更新的计算过程
  
  
  state.value = newState.toString(2).padStart(8, '0');
  
  // 保存到cookie
  document.cookie = `contractState=${state.value}; path=/; max-age=31536000`;
  
  showResult.value = true;
}

onMounted(() => {
  // 从cookie中恢复状态
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'contractState' && value) {
      state.value = value;
      break;
    }
  }
  
  // 如果没有cookie，初始化state为00110000
  if (!document.cookie.includes('contractState')) {
    state.value = '00110000';
  }
  
  // 初始化op的可编辑位
  updateOp();
});
</script>

<style scoped>
.contract-code-explainer {
  font-family: 'Arial', sans-serif;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.state-display, .rule-selection, .op-input, .action-section, .result-section, .formula-display {
  margin-bottom: 25px;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.code-label {
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 16px;
}

.state-explanation {
  font-weight: normal;
  color: #2196f3;
  margin-left: 10px;
  font-size: 14px;
}

.formula {
  font-family: monospace;
  font-size: 16px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
  text-align: center;
  overflow-x: auto;
}

.binary-visualization {
  display: flex;
  margin: 15px 0;
  justify-content: center;
}

.bit-box {
  width: 40px;
  height: 40px;
  border: 2px solid #333;
  margin: 0 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #f5f5f5;
}

.bit-box.active {
  background-color: #e1f5fe;
  border-color: #2196f3;
}

.bit-value {
  font-size: 20px;
  font-weight: bold;
}

.bit-position {
  font-size: 12px;
  color: #666;
  margin-top: 2px;
}

.rule-options {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
}

.rule-options label {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.op-bits-input {
  display: flex;
  align-items: center;
  gap: 15px;
}

.editable-bits {
  display: flex;
  gap: 5px;
}

.bit-input {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bit-input select {
  width: 40px;
  height: 40px;
  font-size: 20px;
  text-align: center;
  border: 2px solid #333;
  border-radius: 4px;
  cursor: pointer;
}

.fixed-bits {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: #666;
}

.bit-positions {
  display: flex;
  gap: 25px;
  margin-top: 5px;
  font-size: 12px;
}

.action-button {
  padding: 12px 30px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: #0b7dda;
}

.expression-result {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.expression-text, .update-text {
  font-weight: bold;
  font-size: 16px;
}

.emoji {
  font-size: 30px;
  margin-left: 10px;
}

.state-update {
  margin-top: 20px;
}

.debug-info {
  margin-top: 20px;
  border-top: 1px dashed #ccc;
  padding-top: 15px;
}

.debug-info summary {
  font-weight: bold;
  cursor: pointer;
  color: #666;
}

.debug-info pre {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  font-family: monospace;
  white-space: pre-wrap;
  font-size: 14px;
}
</style>
