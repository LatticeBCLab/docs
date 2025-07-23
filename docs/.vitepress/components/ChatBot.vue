<template>
  <div class="chatbot">
    <!-- 聊天按钮 -->
    <div 
      class="chat-button" 
      @click="toggleChat"
      :class="{ 'active': isChatOpen }"
    >
      <svg v-if="!isChatOpen" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z" fill="currentColor"/>
        <circle cx="8" cy="10" r="1" fill="currentColor"/>
        <circle cx="12" cy="10" r="1" fill="currentColor"/>
        <circle cx="16" cy="10" r="1" fill="currentColor"/>
      </svg>
      <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
      </svg>
    </div>

    <!-- 聊天窗口 -->
    <transition name="chat-slide">
      <div v-if="isChatOpen" class="chat-window">
        <div class="chat-header">
          <h3>ZLattice 智能助手</h3>
          <div class="header-actions">
            <button @click="clearChat" class="clear-btn" title="清空对话">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="currentColor"/>
              </svg>
            </button>
            <button @click="toggleChat" class="close-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="chat-messages" ref="messagesContainer">
          <div 
            v-for="message in messages" 
            :key="message.id" 
            :class="['message', message.type]"
          >
            <div class="message-content">
              <div class="message-text" v-html="formatMessage(message.text)"></div>
              <span class="message-time">{{ formatTime(message.timestamp) }}</span>
              
              <!-- 来源文档 -->
              <div v-if="message.sources && message.sources.length > 0" class="message-sources">
                <details>
                  <summary>参考文档 ({{ message.sources.length }})</summary>
                  <div class="sources-list">
                    <div v-for="(source, index) in message.sources" :key="index" class="source-item">
                      <div class="source-content">{{ source.content.substring(0, 100) }}...</div>
                      <div class="source-meta">来源: {{ source.source }}</div>
                    </div>
                  </div>
                </details>
              </div>
              
              <!-- 反馈按钮 (仅对机器人回复显示) -->
              <div v-if="message.type === 'bot' && 
                        message.id === getLastBotMessage()?.id && 
                        !message.text.includes('服务暂时不可用') && 
                        !message.text.includes('欢迎使用') &&
                        !message.feedbackSubmitted" 
                   class="feedback-buttons">
                <button @click="quickFeedback('positive', message.id)" class="feedback-btn positive" title="有帮助">
                  👍
                </button>
                <button @click="quickFeedback('negative', message.id)" class="feedback-btn negative" title="没有帮助">
                  👎
                </button>
                <button @click="showFeedbackForm(message.id)" class="feedback-btn detailed" title="详细反馈">
                  💬
                </button>
              </div>
            </div>
          </div>
          
          <!-- 正在输入指示器 -->
          <div v-if="isTyping" class="message bot">
            <div class="message-content typing">
              <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="chat-input">
          <div class="input-container">
            <input 
              v-model="newMessage" 
              @keypress.enter="sendMessage"
              placeholder="输入您的问题..."
              :disabled="isTyping"
              ref="messageInput"
            />
            <button 
              @click="sendMessage" 
              :disabled="!newMessage.trim() || isTyping"
              class="send-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- 快捷回复 -->
        <div class="quick-replies" v-if="showQuickReplies && messages.length <= 1">
          <button 
            v-for="reply in quickReplies" 
            :key="reply.id"
            @click="selectQuickReply(reply.text)"
            class="quick-reply-btn"
          >
            {{ reply.text }}
          </button>
        </div>
        
        <!-- 详细反馈表单 -->
        <div v-if="showFeedback" class="feedback-form">
          <div class="feedback-header">
            <h4>提供反馈</h4>
            <button @click="closeFeedbackForm" class="close-feedback">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
          
          <div class="feedback-options">
            <label>
              <input type="radio" v-model="feedbackType" value="positive" />
              <span>👍 有帮助</span>
            </label>
            <label>
              <input type="radio" v-model="feedbackType" value="negative" />
              <span>👎 没有帮助</span>
            </label>
            <label>
              <input type="radio" v-model="feedbackType" value="corrected" />
              <span>✏️ 需要修正</span>
            </label>
          </div>
          
          <div v-if="feedbackType === 'corrected'" class="corrected-answer">
            <label>正确答案：</label>
            <textarea v-model="correctedAnswer" placeholder="请提供正确的答案..."></textarea>
          </div>
          
          <div class="feedback-text">
            <label>补充说明（可选）：</label>
            <textarea v-model="feedbackText" placeholder="请提供更多详细信息..."></textarea>
          </div>
          
          <div class="feedback-actions">
            <button @click="closeFeedbackForm" class="cancel-btn">取消</button>
            <button @click="submitDetailedFeedback" :disabled="!feedbackType" class="submit-btn">提交反馈</button>
          </div>
        </div>
        
        <!-- 连接状态指示器 -->
        <div v-if="!isConnected" class="connection-status">
          <span class="status-indicator offline"></span>
          <span>服务连接中断，请检查网络连接</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import grpcModule from './generated/knowledge_service_grpc_web_pb.js'
import pbModule from './generated/knowledge_service_pb.js'
// 动态导入gRPC模块
let KnowledgeServiceClient = grpcModule.KnowledgeServiceClient
let ChatRequest = pbModule.ChatRequest
let FeedbackRequest = pbModule.FeedbackRequest

// 组件状态
const isChatOpen = ref(false)
const newMessage = ref('')
const isTyping = ref(false)
const showQuickReplies = ref(true)
const messagesContainer = ref(null)
const messageInput = ref(null)
const showFeedback = ref(false)
const feedbackType = ref('')
const correctedAnswer = ref('')
const feedbackText = ref('')
const currentFeedbackMessageId = ref(null)
const isConnected = ref(true)
const client = ref(null)
const lastBotResponse = ref(null)

// 知识服务API配置 - 从VitePress配置中获取
import { useData } from 'vitepress'
const { site } = useData()
const KNOWLEDGE_SERVICE_URL = site.value.knowledgeServiceUrl || 'http://localhost:8080'

// 消息列表
const messages = ref([
  {
    id: 1,
    type: 'bot',
    text: '您好！我是ZLattice智能助手，可以帮助您解答关于晶格链的问题。请随时向我提问！',
    timestamp: new Date(),
    sources: []
  }
])

// 快捷回复
const quickReplies = ref([
  { id: 1, text: '如何快速开始使用ZLattice？' },
  { id: 2, text: '智能合约如何部署？' },
  { id: 3, text: '共识机制是如何工作的？' },
  { id: 4, text: 'API接口如何使用？' },
  { id: 5, text: '跨链功能如何实现？' }
])

   
// 初始化gRPC客户端
const initializeGrpcClient = async () => {
  try {
    // 创建客户端实例
    client.value = new KnowledgeServiceClient(KNOWLEDGE_SERVICE_URL, null, {
      unaryInterceptors: [],
      streamInterceptors: []
    })
    
    // 测试连接
    const healthRequest = new pbModule.HealthCheckRequest()
    try {
      await client.value.healthCheck(healthRequest)
      isConnected.value = true
      console.log('gRPC客户端初始化成功')
    } catch (e) {
      console.error('健康检查失败:', e)
      isConnected.value = false
    }
  } catch (error) {
    console.error('gRPC客户端初始化失败:', error)
    isConnected.value = false
  }
}

// 组件挂载时初始化
onMounted(() => {
  initializeGrpcClient()
})

// 切换聊天窗口
const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value
  if (isChatOpen.value) {
    nextTick(() => {
      scrollToBottom()
      if (messageInput.value) {
        messageInput.value.focus()
      }
    })
  }
}

// 清空对话
const clearChat = () => {
  messages.value = [
    {
      id: Date.now(),
      type: 'bot',
      text: '对话已清空。有什么我可以帮助您的吗？',
      timestamp: new Date(),
      sources: []
    }
  ]
  lastBotResponse.value = null
  showQuickReplies.value = true
  nextTick(() => {
    scrollToBottom()
  })
}

// 发送消息
const sendMessage = async () => {
  if (!newMessage.value.trim() || isTyping.value || !client.value) return
  
  const userMessage = {
    id: Date.now(),
    type: 'user',
    text: newMessage.value.trim(),
    timestamp: new Date()
  }
  
  messages.value.push(userMessage)
  const question = newMessage.value.trim()
  newMessage.value = ''
  showQuickReplies.value = false
  
  // 滚动到底部
  nextTick(() => {
    scrollToBottom()
  })
  
  // 显示正在输入状态
  isTyping.value = true
  
  try {
    const response = await getBotResponse(question)
    
    const botMessage = {
      id: Date.now() + 1,
      type: 'bot',
      text: response.final_answer || response.original_answer || '抱歉，我无法回答这个问题。',
      timestamp: new Date(),
      sources: response.source_documents || [],
      feedbackSubmitted: false
    }
    
    messages.value.push(botMessage)
    lastBotResponse.value = response
    
  } catch (error) {
    console.error('发送消息失败:', error)
    isConnected.value = false
    
    const errorMessage = {
      id: Date.now() + 1,
      type: 'bot',
      text: '抱歉，服务暂时不可用。请检查网络连接或稍后再试。',
      timestamp: new Date(),
      sources: []
    }
    messages.value.push(errorMessage)
  } finally {
    isTyping.value = false
    nextTick(() => {
      scrollToBottom()
    })
  }
}

// 选择快捷回复
const selectQuickReply = (text) => {
  newMessage.value = text
  sendMessage()
}

// 获取机器人回复
const getBotResponse = async (message) => {
  try {
    if (!ChatRequest || !client.value) {
      throw new Error('gRPC客户端未初始化')
    }
    
    // 创建聊天请求
    const request = new ChatRequest()
    request.setQuestion(message)
    request.setUseFeedback(true)
    
    // 发送请求 - 使用Promise方式调用
    return new Promise((resolve, reject) => {
      client.value.chat(request, {}, (err, response) => {
        if (err) {
          console.error('gRPC调用错误:', err)
          isConnected.value = false
          reject(err)
          return
        }
        
        console.log('收到响应:', response.toObject())
        
        if (response.getSuccess()) {
          isConnected.value = true
          resolve({
            question: response.getQuestion(),
            original_answer: response.getOriginalAnswer(),
            final_answer: response.getFinalAnswer(),
            source_documents: response.getSourceDocumentsList().map(doc => ({
              content: doc.getContent(),
              source: doc.getSource(),
              metadata: doc.getMetadataMap().toObject()
            })),
            feedback_info: response.getFeedbackInfo() ? {
              is_improved: response.getFeedbackInfo().getIsImproved(),
              confidence_score: response.getFeedbackInfo().getConfidenceScore(),
              feedback_count: response.getFeedbackInfo().getFeedbackCount(),
              similar_questions: response.getFeedbackInfo().getSimilarQuestionsList().map(q => ({
                question: q.getQuestion(),
                similarity_score: q.getSimilarityScore(),
                feedback_type: q.getFeedbackType()
              }))
            } : null
          })
        } else {
          reject(new Error(response.getErrorMessage() || '服务器响应错误'))
        }
      })
    })
  } catch (error) {
    console.error('获取机器人回复失败:', error)
    isConnected.value = false
    throw error
  }
}

// 获取最后一条机器人消息
const getLastBotMessage = () => {
  const botMessages = messages.value.filter(m => m.type === 'bot')
  return botMessages[botMessages.length - 1]
}

// 快速反馈
const quickFeedback = async (type, messageId) => {
  try {
    await submitFeedback(type)
    
    // 标记消息已反馈
    const message = messages.value.find(m => m.id === messageId)
    if (message) {
      message.feedbackSubmitted = true
    }
    
    // 显示反馈成功消息
    const feedbackMessage = {
      id: Date.now(),
      type: 'system',
      text: type === 'positive' ? '感谢您的正面反馈！' : '感谢您的反馈，我们会持续改进。',
      timestamp: new Date(),
      sources: []
    }
    messages.value.push(feedbackMessage)
    
    nextTick(() => {
      scrollToBottom()
    })
  } catch (error) {
    console.error('快速反馈失败:', error)
  }
}

// 显示反馈表单
const showFeedbackForm = (messageId) => {
  currentFeedbackMessageId.value = messageId
  showFeedback.value = true
  feedbackType.value = ''
  correctedAnswer.value = ''
  feedbackText.value = ''
}

// 关闭反馈表单
const closeFeedbackForm = () => {
  showFeedback.value = false
  currentFeedbackMessageId.value = null
  feedbackType.value = ''
  correctedAnswer.value = ''
  feedbackText.value = ''
}

// 提交详细反馈
const submitDetailedFeedback = async () => {
  try {
    await submitFeedback(feedbackType.value, correctedAnswer.value, feedbackText.value)
    
    // 标记消息已反馈
    if (currentFeedbackMessageId.value) {
      const message = messages.value.find(m => m.id === currentFeedbackMessageId.value)
      if (message) {
        message.feedbackSubmitted = true
      }
    }
    
    // 显示反馈成功消息
    const feedbackMessage = {
      id: Date.now(),
      type: 'system',
      text: '感谢您的详细反馈！这将帮助我们改进服务质量。',
      timestamp: new Date(),
      sources: []
    }
    messages.value.push(feedbackMessage)
    
    closeFeedbackForm()
    
    nextTick(() => {
      scrollToBottom()
    })
  } catch (error) {
    console.error('提交详细反馈失败:', error)
  }
}

// 提交反馈
const submitFeedback = async (type, corrected = '', text = '') => {
  if (!lastBotResponse.value || !FeedbackRequest || !client.value) {
    throw new Error('无法提交反馈：缺少必要信息')
  }
  
  try {
    // 创建反馈请求
    const request = new FeedbackRequest()
    request.setQuestion(lastBotResponse.value.question)
    request.setOriginalAnswer(lastBotResponse.value.original_answer)
    request.setFeedbackType(type)
    
    if (corrected) {
      request.setCorrectedAnswer(corrected)
    }
    
    if (text) {
      request.setFeedbackText(text)
    }
    
    // 设置来源文档
    if (lastBotResponse.value.source_documents && lastBotResponse.value.source_documents.length > 0) {
      // 需要创建新的SourceDocument对象
      const sourceDocsList = lastBotResponse.value.source_documents.map(doc => {
        const sourceDoc = new pbModule.SourceDocument()
        sourceDoc.setContent(doc.content)
        sourceDoc.setSource(doc.source)
        
        // 处理metadata
        if (doc.metadata) {
          const metadataMap = sourceDoc.getMetadataMap()
          Object.entries(doc.metadata).forEach(([key, value]) => {
            metadataMap.set(key, value)
          })
        }
        
        return sourceDoc
      })
      
      request.setSourceDocumentsList(sourceDocsList)
    }
    
    // 发送反馈 - 使用Promise方式调用
    return new Promise((resolve, reject) => {
      client.value.submitFeedback(request, {}, (err, response) => {
        if (err) {
          console.error('提交反馈gRPC调用错误:', err)
          isConnected.value = false
          reject(err)
          return
        }
        
        if (response.getSuccess()) {
          isConnected.value = true
          resolve(response)
        } else {
          reject(new Error(response.getErrorMessage() || '反馈提交失败'))
        }
      })
    })
  } catch (error) {
    console.error('提交反馈失败:', error)
    isConnected.value = false
    throw error
  }
}

// 滚动到底部
const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// 格式化时间
const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 格式化消息内容（支持简单的markdown）
const formatMessage = (text) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>')
}
</script>

<style scoped>
.chatbot {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.chat-button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.chat-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
}

.chat-button.active {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.chat-window {
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 380px;
  height: 600px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #e1e5e9;
}

.chat-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.clear-btn,
.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.clear-btn:hover,
.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message {
  display: flex;
  flex-direction: column;
}

.message.user {
  align-items: flex-end;
}

.message.bot,
.message.system {
  align-items: flex-start;
}

.message-content {
  max-width: 85%;
  padding: 12px 16px;
  border-radius: 18px;
  position: relative;
}

.message.user .message-content {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-bottom-right-radius: 4px;
}

.message.bot .message-content {
  background: #f8f9fa;
  color: #333;
  border: 1px solid #e9ecef;
  border-bottom-left-radius: 4px;
}

.message.system .message-content {
  background: #e8f5e8;
  color: #2d5a2d;
  border: 1px solid #c3e6c3;
  font-size: 14px;
  text-align: center;
}

.message-text {
  line-height: 1.4;
  word-wrap: break-word;
}

.message-time {
  font-size: 11px;
  opacity: 0.7;
  margin-top: 4px;
  display: block;
}

.message-sources {
  margin-top: 8px;
  font-size: 12px;
}

.message-sources details {
  cursor: pointer;
}

.message-sources summary {
  color: #667eea;
  font-weight: 500;
  padding: 4px 0;
}

.sources-list {
  margin-top: 8px;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.source-item {
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e9ecef;
}

.source-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.source-content {
  color: #555;
  line-height: 1.3;
  margin-bottom: 4px;
}

.source-meta {
  color: #888;
  font-size: 11px;
}

.feedback-buttons {
  display: flex;
  gap: 6px;
  margin-top: 8px;
}

.feedback-btn {
  background: none;
  border: 1px solid #ddd;
  border-radius: 16px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.feedback-btn:hover {
  background: #f5f5f5;
  border-color: #bbb;
}

.feedback-btn.positive:hover {
  background: #e8f5e8;
  border-color: #4caf50;
}

.feedback-btn.negative:hover {
  background: #ffeaea;
  border-color: #f44336;
}

.typing {
  background: #f8f9fa !important;
  border: 1px solid #e9ecef !important;
}

.typing-indicator {
  display: flex;
  gap: 4px;
  align-items: center;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #999;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(1) {
  animation-delay: -0.32s;
}

.typing-indicator span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes typing {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.chat-input {
  padding: 16px;
  border-top: 1px solid #e9ecef;
  background: white;
}

.input-container {
  display: flex;
  gap: 8px;
  align-items: center;
}

.input-container input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 24px;
  outline: none;
  font-size: 14px;
  transition: border-color 0.2s;
}

.input-container input:focus {
  border-color: #667eea;
}

.input-container input:disabled {
  background: #f5f5f5;
  color: #999;
}

.send-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.send-btn:hover:not(:disabled) {
  transform: scale(1.05);
}

.send-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
}

.quick-replies {
  padding: 0 16px 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.quick-reply-btn {
  background: white;
  border: 1px solid #ddd;
  border-radius: 16px;
  padding: 8px 12px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  color: #555;
}

.quick-reply-btn:hover {
  background: #f8f9fa;
  border-color: #667eea;
  color: #667eea;
}

.feedback-form {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  z-index: 10;
}

.feedback-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e9ecef;
}

.feedback-header h4 {
  margin: 0;
  color: #333;
  font-size: 16px;
}

.close-feedback {
  background: none;
  border: none;
  cursor: pointer;
  color: #999;
  padding: 4px;
}

.feedback-options {
  margin-bottom: 16px;
}

.feedback-options label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.2s;
}

.feedback-options label:hover {
  background: #f8f9fa;
}

.feedback-options input[type="radio"] {
  margin: 0;
}

.corrected-answer,
.feedback-text {
  margin-bottom: 16px;
}

.corrected-answer label,
.feedback-text label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.corrected-answer textarea,
.feedback-text textarea {
  width: 100%;
  min-height: 80px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: vertical;
  font-family: inherit;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.corrected-answer textarea:focus,
.feedback-text textarea:focus {
  border-color: #667eea;
}

.feedback-actions {
  display: flex;
  gap: 12px;
  margin-top: auto;
}

.cancel-btn,
.submit-btn {
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn {
  background: white;
  border: 1px solid #ddd;
  color: #666;
}

.cancel-btn:hover {
  background: #f8f9fa;
  border-color: #bbb;
}

.submit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.connection-status {
  padding: 8px 16px;
  background: #fff3cd;
  border-top: 1px solid #ffeaa7;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #856404;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #dc3545;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

/* 聊天窗口动画 */
.chat-slide-enter-active,
.chat-slide-leave-active {
  transition: all 0.3s ease;
}

.chat-slide-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.chat-slide-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

/* 响应式设计 */
@media (max-width: 480px) {
  .chatbot {
    bottom: 10px;
    right: 10px;
  }
  
  .chat-window {
    width: calc(100vw - 20px);
    height: calc(100vh - 100px);
    bottom: 70px;
    right: -10px;
  }
  
  .chat-button {
    width: 50px;
    height: 50px;
  }
}

/* 滚动条样式 */
.chat-messages::-webkit-scrollbar {
  width: 4px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
  .chat-window {
    background: #1a1a1a;
    border-color: #333;
    color: #e0e0e0;
  }
  
  .message.bot .message-content {
    background: #2d2d2d;
    border-color: #444;
    color: #e0e0e0;
  }
  
  .chat-input {
    background: #1a1a1a;
    border-color: #333;
  }
  
  .input-container input {
    background: #2d2d2d;
    border-color: #444;
    color: #e0e0e0;
  }
  
  .input-container input:focus {
    border-color: #667eea;
  }
  
  .quick-reply-btn {
    background: #2d2d2d;
    border-color: #444;
    color: #e0e0e0;
  }
  
  .quick-reply-btn:hover {
    background: #3d3d3d;
    border-color: #667eea;
    color: #667eea;
  }
  
  .feedback-form {
    background: #1a1a1a;
    color: #e0e0e0;
  }
  
  .feedback-header {
    border-color: #333;
  }
  
  .feedback-options label:hover {
    background: #2d2d2d;
  }
  
  .corrected-answer textarea,
  .feedback-text textarea {
    background: #2d2d2d;
    border-color: #444;
    color: #e0e0e0;
  }
  
  .cancel-btn {
    background: #2d2d2d;
    border-color: #444;
    color: #e0e0e0;
  }
  
  .cancel-btn:hover {
    background: #3d3d3d;
  }
}
</style>