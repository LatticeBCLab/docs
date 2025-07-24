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
            <div class="header-title">
              <h3>ZLattice 智能助手</h3>
              <button v-if="!showConversationList" class="conversation-list-btn" @click="showConversationList = true" title="对话列表">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" fill="currentColor"/>
                </svg>
              </button>
              <button v-else class="conversation-list-btn" @click="showConversationList = false" title="返回对话">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
                </svg>
              </button>
            </div>
            <div class="header-actions">
              <button @click="toggleEmailInput" class="email-btn" :title="isEmailVerified ? '已验证邮箱' : '邮箱验证'">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" :fill="isEmailVerified ? '#4CAF50' : 'currentColor'"/>
                </svg>
              </button>
              <button @click="startNewConversation" class="new-chat-btn" title="新对话">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
                </svg>
              </button>
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
        
        <!-- 邮箱验证表单 -->
        <div v-if="showEmailInput" class="email-verification-form">
          <div class="email-form-header">
            <h4>邮箱验证</h4>
            <button @click="showEmailInput = false" class="close-email-form">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
          
          <p class="email-description">
            {{ isEmailVerified ? '当前邮箱已验证，会话将自动保存' : '提供邮箱以保存会话记录，或继续使用临时会话' }}
          </p>
          
          <div v-if="!isEmailVerified" class="email-input-group">
            <label>邮箱地址</label>
            <input 
              v-model="userEmail" 
              type="email" 
              placeholder="请输入您的邮箱地址"
              :disabled="isVerifyingEmail"
              @keydown.enter="verifyEmail"
            />
          </div>
          
          <div v-if="emailVerificationMessage" class="email-verification-message" :class="{ 'success': isEmailVerified, 'error': !isEmailVerified && emailVerificationMessage, 'info': !emailVerificationMessage }">
            {{ emailVerificationMessage }}
          </div>
          
          <div class="email-form-actions">
            <button v-if="!isEmailVerified" @click="verifyEmail" :disabled="!userEmail.trim() || isVerifyingEmail" class="verify-email-btn">
              {{ isVerifyingEmail ? '验证中...' : '验证邮箱' }}
            </button>
            <button @click="continueWithTemporarySession" class="continue-temp-btn">
              {{ isEmailVerified ? '切换到临时会话' : '继续临时会话' }}
            </button>
            <button @click="showEmailInput = false" class="close-email-btn">关闭</button>
          </div>
        </div>
        
        <!-- 对话列表 -->
        <div v-else-if="showConversationList" class="conversation-list">
          <div class="new-conversation">
            <input 
              v-model="newConversationTitle" 
              placeholder="新对话标题..."
              @keydown.enter="startNewConversation"
            />
            <button @click="startNewConversation">创建</button>
          </div>
          
          <div v-if="showConversationList && conversations.length === 0" class="empty-state">
            <div class="empty-icon">📝</div>
            <div class="empty-text">没有历史对话</div>
            <div class="empty-subtext">创建一个新的对话开始聊天吧</div>
          </div>
          
          <div v-else-if="showConversationList" class="conversations">
            <div 
              v-for="conv in conversations" 
              :key="conv.id" 
              class="conversation-item"
              :class="{ 'active': currentConversationId === conv.id }"
              @click="switchConversation(conv.id)"
            >
              <div class="conversation-info">
                <div class="conversation-title">{{ conv.title }}</div>
                <div class="conversation-time">{{ formatConversationTime(conv) }}</div>
              </div>
              <button 
                class="delete-conversation" 
                @click.stop="deleteConversation(conv.id)"
                title="删除对话"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- 消息列表 -->
        <div v-else class="chat-messages" ref="messagesContainer">
          <div 
            v-for="message in messages" 
            :key="message.id" 
            :class="['message', message.type]"
          >
            <div class="message-content">
              <div class="message-text" v-html="formatMessage(message.text)"></div>
              <span class="message-time">{{ formatTime(message.timestamp) }}</span>
              
              <!-- 来源文档 -->
              <!-- <div v-if="message.sources && message.sources.length > 0" class="message-sources"> -->
              <div v-if="false" class="message-sources">
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
                        message.id === getLastBotMessage()?.id  &&
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
import pbWeb  from './generated/knowledge_service_grpc_web_pb.js'
const KnowledgeServiceClient = pbWeb.KnowledgeServiceClient
import pbModule from './generated/knowledge_service_pb.js'
const  ChatRequest = pbModule.ChatRequest;
const  FeedbackRequest = pbModule.FeedbackRequest;
const  ConversationChatRequest = pbModule.ConversationChatRequest;
const  CreateConversationRequest = pbModule.CreateConversationRequest;
const  ConversationHistoryRequest = pbModule.ConversationHistoryRequest
const  ListConversationsRequest = pbModule.ListConversationsRequest
const  UpdateConversationRequest = pbModule.UpdateConversationRequest
const  DeleteConversationRequest = pbModule.DeleteConversationRequest
const  HealthCheckRequest = pbModule.HealthCheckRequest
const  EmailVerificationRequest = pbModule.EmailVerificationRequest
const  EmailChatRequest = pbModule.EmailChatRequest
const  SourceDocument = pbModule.SourceDocument
const  Message = pbModule.Message

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

// 对话相关
const currentConversationId = ref('')
const conversations = ref([])
const showConversationList = ref(false)
const newConversationTitle = ref('')

// 邮箱验证相关
const userEmail = ref('')
const isEmailVerified = ref(false)
const showEmailInput = ref(false)
const emailVerificationMessage = ref('')
const isVerifyingEmail = ref(false)
const isTemporarySession = ref(true) // 默认为临时会话

// 知识服务API配置 - 从VitePress主题配置中获取
import { useData } from 'vitepress'
const { theme } = useData()
// 调试输出theme对象，查看是否包含knowledgeServiceUrl
console.log('VitePress theme配置:', theme.value)
// 使用可选链和默认值，确保即使配置不存在也能正常工作
const KNOWLEDGE_SERVICE_URL = theme.value?.knowledgeServiceUrl 
// 消息列表
const Prompt_MSG_TYPE = 'prompt'
const Bot_MSG_TYPE = 'bot'
const messages = ref([
  {
    id: 1,
    type: Prompt_MSG_TYPE,
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
    // 验证服务URL是否存在
    if (!KNOWLEDGE_SERVICE_URL) {
      console.error('知识服务URL未配置')
      isConnected.value = false
      return
    }
    
    console.log('正在连接知识服务:', KNOWLEDGE_SERVICE_URL)
    
    // 创建客户端实例
    client.value = new KnowledgeServiceClient(KNOWLEDGE_SERVICE_URL, null, {
      unaryInterceptors: [],
      streamInterceptors: []
    })
    
    // 健康检查函数
    const healthRequest = new HealthCheckRequest()
    const checkHealth = async () => {
      if (!client.value) {
        console.error('健康检查失败: 客户端未初始化')
        isConnected.value = false
        return
      }
      
      try {
        // 设置请求超时
        const deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 10); // 10秒超时
        
        // 执行健康检查
        return new Promise((resolve) => {
          client.value.healthCheck(healthRequest, {deadline: deadline.getTime()}, (err, response) => {
            if (err) {
              console.error('健康检查失败:', err)
              isConnected.value = false
              resolve(false)
              return
            }
            
            if (!response) {
              console.error('健康检查失败: 响应为空')
              isConnected.value = false
              resolve(false)
              return
            }
            
            // 检查响应是否成功
            const success = response.getSuccess ? response.getSuccess() : true
            isConnected.value = success
            
            if (success) {
              console.log('健康检查成功')
            } else {
              console.error('健康检查失败: 服务不可用')
            }
            
            resolve(success)
          })
        })
      } catch (e) {
        console.error('健康检查执行出错:', e)
        isConnected.value = false
        return false
      }
    }

    // 执行初始健康检查
    const initialHealth = await checkHealth()
    
    if (initialHealth) {
      console.log('gRPC客户端初始化成功')
      
      // 获取对话列表
      getConversationList().catch(err => {
        console.error('获取对话列表失败:', err)
      })
    } else {
      console.error('gRPC客户端初始化失败: 健康检查未通过')
    }

    // 设置每30秒执行一次健康检查
    const healthCheckInterval = setInterval(checkHealth, 30000)

    // 组件卸载时清理定时器和客户端
    onUnmounted(() => {
      clearInterval(healthCheckInterval)
      client.value = null
    })

  } catch (error) {
    console.error('初始化gRPC客户端失败:', error)
    isConnected.value = false
  }
}

// 组件挂载时初始化
onMounted(() => {
  // 初始化gRPC客户端
  // 注意：对话列表获取已经移到initializeGrpcClient函数中
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

// 切换邮箱输入界面
const toggleEmailInput = () => {
  showEmailInput.value = !showEmailInput.value
  showConversationList.value = false
}

// 验证邮箱
const verifyEmail = async () => {
  if (!userEmail.value.trim()) {
    emailVerificationMessage.value = '请输入有效的邮箱地址'
    return
  }
  
  if (!client.value) {
    emailVerificationMessage.value = '服务连接失败，请稍后重试'
    return
  }
  
  isVerifyingEmail.value = true
  emailVerificationMessage.value = ''
  
  try {
    const request = new EmailVerificationRequest()
    request.setEmail(userEmail.value.trim())
    
    const deadline = new Date()
    deadline.setSeconds(deadline.getSeconds() + 30)
    
    return new Promise((resolve, reject) => {
      client.value.verifyEmail(request, {deadline: deadline.getTime()}, (err, response) => {
        isVerifyingEmail.value = false
        
        if (err) {
          console.error('邮箱验证失败:', err)
          emailVerificationMessage.value = '验证失败，请检查网络连接'
          isConnected.value = false
          reject(err)
          return
        }
        
        if (!response) {
          emailVerificationMessage.value = '验证失败，服务器响应异常'
          reject(new Error('响应为空'))
          return
        }
        
        try {
          isConnected.value = true
          const isValid = response.getIsValid()
          const success = response.getSuccess()
          const errorMessage = response.getErrorMessage()
          
          if (success && isValid) {
            isEmailVerified.value = true
            isTemporarySession.value = false
            emailVerificationMessage.value = '邮箱验证成功！会话将自动保存'
            
            // 验证成功后可以获取对话列表
            getConversationList().catch(err => {
              console.warn('获取对话列表失败:', err)
            })
          } else {
            isEmailVerified.value = false
            emailVerificationMessage.value = errorMessage || '邮箱验证失败'
          }
          
          resolve(isValid)
        } catch (error) {
          console.error('处理验证响应时出错:', error)
          emailVerificationMessage.value = '处理验证结果时出错'
          reject(error)
        }
      })
    })
  } catch (error) {
    isVerifyingEmail.value = false
    console.error('邮箱验证出错:', error)
    emailVerificationMessage.value = '验证过程中出现错误'
  }
}

// 继续临时会话
const continueWithTemporarySession = () => {
  isTemporarySession.value = true
  isEmailVerified.value = false
  userEmail.value = ''
  emailVerificationMessage.value = ''
  showEmailInput.value = false
  
  // 清空对话列表（临时会话不保存）
  conversations.value = []
  currentConversationId.value = ''
}

// 创建新对话
const createConversation = async (title) => {
  // 验证客户端是否初始化
  if (!client.value) {
    console.error('创建对话失败: 客户端未初始化')
    throw new Error('客户端未初始化')
  }
  
  return new Promise((resolve, reject) => {
    // 创建请求
    const request = new CreateConversationRequest()
    request.setTitle(title || '新对话')
    request.setUserId('web-user-' + Date.now())
    
    // 设置请求超时
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 30); // 30秒超时
    
    // 发送请求
    client.value.createConversation(request, {deadline: deadline.getTime()}, (err, response) => {
      if (err) {
        console.error('创建对话失败:', err)
        isConnected.value = false
        reject(err)
        return
      }
      
      // 检查响应是否存在
      if (!response) {
        console.error('创建对话失败: 响应为空')
        reject(new Error('响应为空'))
        return
      }
      
      // 检查响应方法是否存在
      if (!response.getConversationId) {
        console.error('创建对话失败: 响应不完整', response)
        reject(new Error('响应不完整'))
        return
      }
      
      try {
        // 连接成功
        isConnected.value = true
        
        // 获取对话ID
        const conversationId = response.getConversationId()
        if (!conversationId) {
          throw new Error('未返回对话ID')
        }
        
        // 设置当前对话ID
        currentConversationId.value = conversationId
        
        // 更新对话列表
        getConversationList().catch(err => {
          console.warn('获取对话列表失败:', err)
          // 即使获取列表失败，也认为创建成功
        })
        
        resolve(conversationId)
      } catch (error) {
        console.error('处理响应时出错:', error)
        reject(error)
      }
    })
  })
}

// 获取对话列表
const getConversationList = async () => {
  return new Promise((resolve, reject) => {
    const request = new ListConversationsRequest()
    request.setUserId('web-user')
    request.setLimit(20)
    request.setOffset(0)
    request.setIncludeArchived(false)
    
    // 设置请求超时
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 30); // 30秒超时
    
    client.value.listConversations(request, {deadline: deadline.getTime()}, (err, response) => {
      if (err) {
        console.error('获取对话列表gRPC调用错误:', err)
        isConnected.value = false
        reject(err)
        return
      }
      
      // 检查响应是否完整
      if (!response || !response.getConversationsList) {
        console.error('获取对话列表失败: 响应不完整', response)
        reject(new Error('响应不完整'))
        return
      }
      
      try {
        isConnected.value = true
        const conversationsList = response.getConversationsList()
        conversations.value = conversationsList.map(conv => {
          try {
            return {
              id: conv.getConversationId(),
              title: conv.getTitle(),
              time: conv.getUpdatedAt(),
              created_at: conv.getCreatedAt()
            }
          } catch (e) {
            console.warn('解析对话时出错:', e)
            return {
              id: '未知ID',
              title: '未知标题',
              time: new Date(),
              created_at: new Date()
            }
          }
        })
        
        // 如果有对话，选择第一个
        if (conversations.value.length > 0 && !currentConversationId.value) {
          switchConversation(conversations.value[0].id)
        }
        
        resolve(conversations.value)
      } catch (error) {
        console.error('处理响应时出错:', error)
        reject(error)
      }
    })
  })
}

// 获取对话历史
const getConversationHistory = async (conversationId) => {
  return new Promise((resolve, reject) => {
    const request = new ConversationHistoryRequest()
    request.setConversationId(conversationId)
    request.setLimit(100)
    request.setOffset(0)
    
    // 设置请求超时
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 30); // 30秒超时
    
    client.value.getConversationHistory(request, {deadline: deadline.getTime()}, (err, response) => {
      if (err) {
        console.error('获取对话历史gRPC调用错误:', err)
        isConnected.value = false
        reject(err)
        return
      }
      
      // 检查响应是否完整
      if (!response || !response.getMessagesList) {
        console.error('获取对话历史失败: 响应不完整', response)
        reject(new Error('响应不完整'))
        return
      }
      
      try {
        isConnected.value = true
        const messagesList = response.getMessagesList()
        const historyMessages = messagesList.map(msg => {
          try {
            return {
              id: msg.getMessageId(),
              type: msg.getRole() === 'user' ? 'user' : Bot_MSG_TYPE,
              text: msg.getContent(),
              timestamp: new Date(msg.getCreatedAt()),
              sources: msg.getSourceDocumentsList ? msg.getSourceDocumentsList() : []
            }
          } catch (e) {
            console.warn('解析消息时出错:', e)
            return {
              id: Date.now() + Math.random(),
              type: Prompt_MSG_TYPE,
              text: '无法加载此消息',
              timestamp: new Date(),
              sources: []
            }
          }
        })
        
        messages.value = historyMessages.length > 0 ? historyMessages : [{
          id: Date.now(),
          type: Prompt_MSG_TYPE,
          text: '开始新对话。有什么我可以帮助您的吗？',
          timestamp: new Date(),
          sources: []
        }]
        
        // 滚动到底部
        nextTick(() => {
          scrollToBottom()
        })
        
        resolve(historyMessages)
      } catch (error) {
        console.error('处理响应时出错:', error)
        reject(error)
      }
    })
  })
}

// 切换对话
const switchConversation = async (conversationId) => {
  currentConversationId.value = conversationId
  await getConversationHistory(conversationId)
  showConversationList.value = false
}

// 开始新对话
const startNewConversation = async () => {
  try {
    // 生成标题
    const title = newConversationTitle.value || '新对话 ' + new Date().toLocaleString()
    
    // 创建对话
    const conversationId = await createConversation(title)
    
    // 重置消息列表
    messages.value = [
      {
        id: Date.now(),
        type: Prompt_MSG_TYPE,  
        text: '开始新对话。有什么我可以帮助您的吗？',
        timestamp: new Date(),
        sources: []
      }
    ]
    
    // 重置状态
    newConversationTitle.value = ''
    showConversationList.value = false
    showQuickReplies.value = true
    lastBotResponse.value = null
    
    // 滚动到底部
    nextTick(() => {
      scrollToBottom()
    })
    
    return conversationId
  } catch (error) {
    console.error('开始新对话失败:', error)
    
    // 显示错误消息
    messages.value = [
      {
        id: Date.now(),
        type: Prompt_MSG_TYPE,
        text: '创建新对话失败，请稍后再试。',
        timestamp: new Date(),
        sources: []
      }
    ]
    
    throw error
  }
}

// 删除对话
const deleteConversation = async (conversationId) => {
  return new Promise((resolve, reject) => {
    const request = new DeleteConversationRequest()
    request.setConversationId(conversationId)
    
    // 设置请求超时
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 30); // 30秒超时
    
    client.value.deleteConversation(request, {deadline: deadline.getTime()}, (err, response) => {
      if (err) {
        console.error('删除对话失败:', err)
        reject(err)
        return
      }
      
      // 检查响应是否完整
      if (!response) {
        console.error('删除对话失败: 响应为空')
        reject(new Error('响应为空'))
        return
      }
      
      try {
        // 如果删除的是当前对话，则清空消息
        if (currentConversationId.value === conversationId) {
          messages.value = [
            {
              id: Date.now(),
              type: Prompt_MSG_TYPE,  
              text: '对话已删除。有什么我可以帮助您的吗？',
              timestamp: new Date(),
              sources: []
            }
          ]
          currentConversationId.value = ''
        }
        
        // 更新对话列表
        getConversationList().catch(err => {
          console.error('获取对话列表失败:', err)
          // 即使获取列表失败，也认为删除成功
        })
        
        resolve(true)
      } catch (error) {
        console.error('处理响应时出错:', error)
        reject(error)
      }
    })
  })
}

// 清空对话
const clearChat = async () => {
  // 如果有当前对话，则创建新对话
  if (currentConversationId.value) {
    try {
      await startNewConversation()
    } catch (error) {
      console.error('创建新对话失败:', error)
      messages.value = [{
        id: Date.now(),
        type: Prompt_MSG_TYPE,
        text: '对话已清空。有什么我可以帮助您的吗？',
        timestamp: new Date(),
        sources: []
      }]
      currentConversationId.value = ''
    }
  } else {
    // 没有当前对话，直接清空
    messages.value = [{
      id: Date.now(),
      type: Prompt_MSG_TYPE,
      text: '对话已清空。有什么我可以帮助您的吗？',
      timestamp: new Date(),
      sources: []
    }]
  }
  lastBotResponse.value = null
  showQuickReplies.value = true
  nextTick(() => {
    scrollToBottom()
  })
}

// 发送消息
const sendMessage = async () => {
  // 基本验证
  if (!newMessage.value.trim() || isTyping.value || !client.value) return
  
  // 创建用户消息
  const userMessage = {
    id: Date.now(),
    type: 'user',
    text: newMessage.value.trim(),
    timestamp: new Date()
  }
  
  // 添加用户消息到列表
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
    let response;
    
    // 根据邮箱验证状态和对话ID选择请求类型
    if (isEmailVerified.value && userEmail.value) {
      // 使用邮箱验证聊天
      const request = new EmailChatRequest()
      request.setEmail(userEmail.value)
      request.setQuestion(question)
      request.setConversationId(currentConversationId.value || '')
      request.setUseFeedback(true)
      request.setUseReranking(true)
      request.setTopK(5)
      request.setSimilarityThreshold(0.7)
      request.setMaxHistoryTurns(10)
      
      // 如果没有对话ID，设置对话标题
      if (!currentConversationId.value) {
        request.setConversationTitle('新对话')
      }
      
      // 发送邮箱验证聊天请求
      response = await new Promise((resolve, reject) => {
        const deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 60);
        
        client.value.chatWithEmailVerification(request, {deadline: deadline.getTime()}, (err, response) => {
          if (err) {
            console.error('邮箱验证聊天请求失败:', err)
            isConnected.value = false
            reject(err)
            return
          }
          
          if (!response) {
            console.error('邮箱验证聊天请求失败: 响应为空')
            reject(new Error('响应为空'))
            return
          }
          
          try {
            isConnected.value = true
            
            // 更新对话ID（如果是新对话）
            if (!currentConversationId.value && response.getConversationId) {
              currentConversationId.value = response.getConversationId()
            }
            
            resolve({
              question: question,
              original_answer: response.getAnswer(),
              final_answer: response.getAnswer(),
              source_documents: response.getSourceDocumentsList ? response.getSourceDocumentsList().map(doc => {
                try {
                  return {
                    content: doc.getContent(),
                    source: doc.getSource(),
                    metadata: doc.getMetadataMap ? doc.getMetadataMap().toObject() : {}
                  }
                } catch (e) {
                  console.warn('解析文档源时出错:', e)
                  return {
                    content: '无法解析内容',
                    source: '未知来源',
                    metadata: {}
                  }
                }
              }) : []
            })
          } catch (error) {
            console.error('处理邮箱验证聊天响应时出错:', error)
            reject(error)
          }
        })
      })
    } else if (currentConversationId.value && !isTemporarySession.value) {
      // 使用对话ID发送消息（非临时会话）
      const request = new ConversationChatRequest()
      request.setQuestion(question)
      request.setConversationId(currentConversationId.value)
      
      response = await new Promise((resolve, reject) => {
        const deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 60);
        
        client.value.chatConversation(request, {deadline: deadline.getTime()}, (err, response) => {
          if (err) {
            console.error('对话请求失败:', err)
            isConnected.value = false
            reject(err)
            return
          }
          
          if (!response) {
            console.error('对话请求失败: 响应为空')
            reject(new Error('响应为空'))
            return
          }
          
          if (!response.getAnswer) {
            console.error('对话请求失败: 响应不完整', response)
            reject(new Error('响应不完整'))
            return
          }
          
          try {
            isConnected.value = true
            
            resolve({
              question: question,
              original_answer: response.getAnswer(),
              final_answer: response.getAnswer(),
              source_documents: response.getSourceDocumentsList ? response.getSourceDocumentsList().map(doc => {
                try {
                  return {
                    content: doc.getContent(),
                    source: doc.getSource(),
                    metadata: doc.getMetadataMap ? doc.getMetadataMap().toObject() : {}
                  }
                } catch (e) {
                  console.warn('解析文档源时出错:', e)
                  return {
                    content: '无法解析内容',
                    source: '未知来源',
                    metadata: {}
                  }
                }
              }) : []
            })
          } catch (error) {
            console.error('处理响应时出错:', error)
            reject(error)
          }
        })
      })
    } else {
      // 临时会话或普通聊天请求
      response = await getBotResponse(question)
    }
    
    // 创建机器人回复消息
    const botMessage = {
      id: Date.now() + 1,
      type: Bot_MSG_TYPE,
      text: response.final_answer || response.original_answer || '抱歉，我无法回答这个问题。',
      timestamp: new Date(),
      sources: response.source_documents || [],
      feedbackSubmitted: false
    }
    
    // 添加机器人回复到消息列表
    messages.value.push(botMessage)
    lastBotResponse.value = response
    
  } catch (error) {
    console.error('发送消息失败:', error)
    isConnected.value = false
    
    // 显示错误消息
    const errorMessage = {
      id: Date.now() + 1,
      type: Prompt_MSG_TYPE,
      text: '抱歉，服务暂时不可用。请检查网络连接或稍后再试。',
      timestamp: new Date(),
      sources: []
    }
    messages.value.push(errorMessage)
  } finally {
    // 无论成功失败，都结束输入状态并滚动到底部
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
    // 验证客户端是否初始化
    if (!client.value) {
      throw new Error('gRPC客户端未初始化')
    }
    
    // 创建聊天请求
    const request = new ChatRequest()
    request.setQuestion(message)
    request.setUseFeedback(true)
    
    // 发送请求 - 使用Promise方式调用
    return new Promise((resolve, reject) => {
      // 设置请求超时
      const deadline = new Date();
      deadline.setSeconds(deadline.getSeconds() + 60); // 60秒超时
      
      client.value.chat(request, {deadline: deadline.getTime()}, (err, response) => {
        if (err) {
          console.error('gRPC调用错误:', err)
          isConnected.value = false
          reject(err)
          return
        }
        
        // 检查响应是否存在
        if (!response) {
          console.error('聊天请求失败: 响应为空')
          reject(new Error('响应为空'))
          return
        }
        
        try {
          // 检查响应方法是否存在
          if (!response.getSuccess) {
            console.error('聊天请求失败: 响应不完整', response)
            reject(new Error('响应不完整'))
            return
          }
          
          if (response.getSuccess()) {
            // 连接成功
            isConnected.value = true
            
            // 检查所有必要的getter方法是否存在
            if (!response.getQuestion || !response.getOriginalAnswer || !response.getFinalAnswer) {
              console.error('聊天请求失败: 响应缺少必要字段', response)
              reject(new Error('响应缺少必要字段'))
              return
            }
            
            // 安全地处理响应数据
            const responseData = {
              question: response.getQuestion(),
              original_answer: response.getOriginalAnswer(),
              final_answer: response.getFinalAnswer(),
              source_documents: [],
              feedback_info: null
            }
            
            // 安全地处理源文档列表
            if (response.getSourceDocumentsList) {
              try {
                responseData.source_documents = response.getSourceDocumentsList().map(doc => {
                  try {
                    return {
                      content: doc.getContent(),
                      source: doc.getSource(),
                      metadata: doc.getMetadataMap ? doc.getMetadataMap().toObject() : {}
                    }
                  } catch (e) {
                    console.warn('解析文档源时出错:', e)
                    return {
                      content: '无法解析内容',
                      source: '未知来源',
                      metadata: {}
                    }
                  }
                })
              } catch (e) {
                console.warn('处理源文档列表时出错:', e)
              }
            }
            
            // 安全地处理反馈信息
            if (response.getFeedbackInfo && response.getFeedbackInfo()) {
              try {
                const feedbackInfo = response.getFeedbackInfo()
                responseData.feedback_info = {
                  is_improved: feedbackInfo.getIsImproved ? feedbackInfo.getIsImproved() : false,
                  confidence_score: feedbackInfo.getConfidenceScore ? feedbackInfo.getConfidenceScore() : 0,
                  feedback_count: feedbackInfo.getFeedbackCount ? feedbackInfo.getFeedbackCount() : 0,
                  similar_questions: []
                }
                
                // 安全地处理相似问题列表
                if (feedbackInfo.getSimilarQuestionsList) {
                  try {
                    responseData.feedback_info.similar_questions = feedbackInfo.getSimilarQuestionsList().map(q => {
                      try {
                        return {
                          question: q.getQuestion(),
                          similarity_score: q.getSimilarityScore(),
                          feedback_type: q.getFeedbackType()
                        }
                      } catch (e) {
                        console.warn('解析相似问题时出错:', e)
                        return {
                          question: '无法解析问题',
                          similarity_score: 0,
                          feedback_type: ''
                        }
                      }
                    })
                  } catch (e) {
                    console.warn('处理相似问题列表时出错:', e)
                  }
                }
              } catch (e) {
                console.warn('处理反馈信息时出错:', e)
              }
            }
            
            resolve(responseData)
          } else {
            // 服务器返回错误
            const errorMessage = response.getErrorMessage ? response.getErrorMessage() : '服务器响应错误'
            console.error('服务器返回错误:', errorMessage)
            reject(new Error(errorMessage))
          }
        } catch (error) {
          console.error('处理响应时出错:', error)
          reject(error)
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
  try {
    // 验证消息列表是否存在
    if (!messages.value || !Array.isArray(messages.value)) {
      console.warn('获取最后一条机器人消息失败: 消息列表不可用')
      return null
    }
    
    // 过滤出所有机器人消息
    const botMessages = messages.value.filter(m => m && m.type === Bot_MSG_TYPE)
    
    // 检查是否有机器人消息
    if (botMessages.length === 0) {
      return null
    }
    
    // 返回最后一条机器人消息
    return botMessages[botMessages.length - 1]
  } catch (error) {
    console.error('获取最后一条机器人消息时出错:', error)
    return null
  }
}

// 快速反馈
const quickFeedback = async (type, messageId) => {
  // 验证参数
  if (!type || !messageId) {
    console.error('快速反馈失败: 缺少必要参数', { type, messageId })
    return
  }
  
  // 验证反馈类型
  if (!['positive', 'negative'].includes(type)) {
    console.error('快速反馈失败: 无效的反馈类型', type)
    return
  }
  
  // 验证消息是否存在
  const message = messages.value.find(m => m.id === messageId)
  if (!message) {
    console.error('快速反馈失败: 找不到对应的消息', messageId)
    return
  }
  
  // 验证是否已经提交过反馈
  if (message.feedbackSubmitted) {
    console.warn('已经为此消息提交过反馈')
    return
  }
  
  try {
    // 提交反馈
    await submitFeedback(type)
    
    // 标记消息已反馈
    message.feedbackSubmitted = true
    
    // 显示反馈成功消息
    const feedbackMessage = {
      id: Date.now(),
      type: 'system',
      text: type === 'positive' ? '感谢您的正面反馈！' : '感谢您的反馈，我们会持续改进。',
      timestamp: new Date(),
      sources: []
    }
    messages.value.push(feedbackMessage)
    
    // 滚动到底部
    nextTick(() => {
      scrollToBottom()
    })
  } catch (error) {
    console.error('快速反馈失败:', error)
    
    // 显示错误消息
    const errorMessage = {
      id: Date.now(),
      type: 'system',
      text: '反馈提交失败，请稍后再试。',
      timestamp: new Date(),
      sources: []
    }
    messages.value.push(errorMessage)
    
    // 滚动到底部
    nextTick(() => {
      scrollToBottom()
    })
  }
}

// 显示反馈表单
const showFeedbackForm = (messageId) => {
  try {
    // 验证消息ID是否有效
    if (!messageId) {
      console.error('显示反馈表单失败: 无效的消息ID')
      return
    }
    
    // 查找对应的消息
    const message = messages.value.find(m => m.id === messageId)
    if (!message) {
      console.error('显示反馈表单失败: 找不到对应的消息', messageId)
      return
    }
    
    // 设置反馈表单状态
    currentFeedbackMessageId.value = messageId
    showFeedback.value = true
    
    // 重置表单字段
    feedbackType.value = ''
    correctedAnswer.value = ''
    feedbackText.value = ''
    
    // 确保表单在视图更新后可见
    nextTick(() => {
      // 如果有表单元素需要聚焦，可以在这里添加
    })
  } catch (error) {
    console.error('显示反馈表单时出错:', error)
  }
}

// 关闭反馈表单
const closeFeedbackForm = () => {
  try {
    // 重置表单状态
    showFeedback.value = false
    currentFeedbackMessageId.value = null
    
    // 清空表单数据
    feedbackType.value = ''
    correctedAnswer.value = ''
    feedbackText.value = ''
    
    // 确保UI更新后的操作
    nextTick(() => {
      // 如果需要在关闭表单后执行其他操作，可以在这里添加
      // 例如：重新聚焦到消息输入框
      if (messageInput.value) {
        messageInput.value.focus()
      }
    })
  } catch (error) {
    console.error('关闭反馈表单时出错:', error)
    // 确保即使出错也能关闭表单
    showFeedback.value = false
  }
}

// 提交详细反馈
const submitDetailedFeedback = async () => {
  // 验证反馈类型是否已选择
  if (!feedbackType.value) {
    console.error('提交详细反馈失败: 未选择反馈类型')
    return
  }
  
  // 如果选择了需要修正但未提供修正内容
  if (feedbackType.value === 'corrected' && !correctedAnswer.value.trim()) {
    console.error('提交详细反馈失败: 选择了需要修正但未提供修正内容')
    // 这里可以添加用户提示，例如高亮输入框等
    return
  }
  
  try {
    // 提交反馈
    await submitFeedback(feedbackType.value, correctedAnswer.value, feedbackText.value)
    
    // 标记消息已反馈
    if (currentFeedbackMessageId.value) {
      const message = messages.value.find(m => m.id === currentFeedbackMessageId.value)
      if (message) {
        message.feedbackSubmitted = true
      } else {
        console.warn('无法找到要标记的消息:', currentFeedbackMessageId.value)
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
    
    // 关闭反馈表单
    closeFeedbackForm()
    
    // 滚动到底部
    nextTick(() => {
      scrollToBottom()
    })
  } catch (error) {
    console.error('提交详细反馈失败:', error)
    
    // 显示错误消息
    const errorMessage = {
      id: Date.now(),
      type: 'system',
      text: '反馈提交失败，请稍后再试。',
      timestamp: new Date(),
      sources: []
    }
    messages.value.push(errorMessage)
    
    // 关闭反馈表单
    closeFeedbackForm()
    
    // 滚动到底部
    nextTick(() => {
      scrollToBottom()
    })
  }
}

// 提交反馈
const submitFeedback = async (type, corrected = '', text = '') => {
  // 验证必要信息
  if (!lastBotResponse.value || !client.value) {
    console.error('无法提交反馈：缺少必要信息')
    throw new Error('无法提交反馈：缺少必要信息')
  }
  
  try {
    // 创建反馈请求
    const request = new FeedbackRequest()
    
    // 设置基本信息
    request.setQuestion(lastBotResponse.value.question)
    request.setOriginalAnswer(lastBotResponse.value.original_answer)
    request.setFeedbackType(type)
    
    // 设置可选信息
    if (corrected) {
      request.setCorrectedAnswer(corrected)
    }
    
    if (text) {
      request.setFeedbackText(text)
    }
    
    // 设置来源文档
    if (lastBotResponse.value.source_documents && lastBotResponse.value.source_documents.length > 0) {
      try {
        // 需要创建新的SourceDocument对象
        const sourceDocsList = lastBotResponse.value.source_documents.map(doc => {
          try {
            const sourceDoc = new SourceDocument()
            sourceDoc.setContent(doc.content || '')
            sourceDoc.setSource(doc.source || '')
            
            // 处理metadata
            if (doc.metadata) {
              try {
                const metadataMap = sourceDoc.getMetadataMap()
                // 确保metadata是字符串类型
                Object.entries(doc.metadata).forEach(([key, value]) => {
                  metadataMap.set(key, String(value))
                })
              } catch (e) {
                console.warn('处理文档元数据时出错:', e)
              }
            }
            
            return sourceDoc
          } catch (e) {
            console.warn('创建源文档对象时出错:', e)
            // 返回一个空的源文档对象
            const emptyDoc = new SourceDocument()
            emptyDoc.setContent('')
            emptyDoc.setSource('')
            return emptyDoc
          }
        })
        
        request.setSourceDocumentsList(sourceDocsList)
      } catch (e) {
        console.warn('设置源文档列表时出错:', e)
      }
    }
    
    // 设置请求超时
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 30); // 30秒超时
    
    // 发送反馈 - 使用Promise方式调用
    return new Promise((resolve, reject) => {
      client.value.submitFeedback(request, {deadline: deadline.getTime()}, (err, response) => {
        if (err) {
          console.error('提交反馈gRPC调用错误:', err)
          isConnected.value = false
          reject(err)
          return
        }
        
        // 检查响应是否存在
        if (!response) {
          console.error('提交反馈失败: 响应为空')
          reject(new Error('响应为空'))
          return
        }
        
        // 检查响应方法是否存在
        if (!response.getSuccess) {
          console.error('提交反馈失败: 响应不完整', response)
          reject(new Error('响应不完整'))
          return
        }
        
        if (response.getSuccess()) {
          // 连接成功
          isConnected.value = true
          resolve(response)
        } else {
          // 服务器返回错误
          const errorMessage = response.getErrorMessage ? response.getErrorMessage() : '反馈提交失败'
          console.error('服务器返回错误:', errorMessage)
          reject(new Error(errorMessage))
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

// 格式化对话时间
const formatConversationTime = (conversation) => {
  const timestamp = conversation.updated_at || conversation.time || conversation.created_at
  if (!timestamp) return ''
  
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now - date
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) {
    // 今天 - 显示时间
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    })
  } else if (diffDays === 1) {
    // 昨天
    return '昨天'
  } else if (diffDays < 7) {
    // 一周内 - 显示星期几
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return weekdays[date.getDay()]
  } else {
    // 超过一周 - 显示日期
    return date.toLocaleDateString('zh-CN', {
      month: '2-digit',
      day: '2-digit'
    })
  }
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

.header-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.chat-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.conversation-list-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.conversation-list-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.header-actions {
  display: flex;
  gap: 8px;
}

.clear-btn,
.close-btn,
.new-chat-btn {
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
.close-btn:hover,
.new-chat-btn:hover {
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

/* 对话列表样式 */
.conversation-list {
  position: absolute;
  top: 64px; /* 头部高度 */
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 10;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.new-conversation {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.new-conversation input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
}

.new-conversation button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  text-align: center;
  color: #8a94a6;
}

.empty-icon {
  font-size: 32px;
  margin-bottom: 16px;
}

.empty-text {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
}

.empty-subtext {
  font-size: 14px;
}

.conversations {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.conversation-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-radius: 8px;
  background: #f8f9fa;
  cursor: pointer;
  transition: background 0.2s;
}

.conversation-item:hover {
  background: #f1f3f5;
}

.conversation-item.active {
  background: #e9ecef;
  border-left: 3px solid #764ba2;
}

.conversation-info {
  flex: 1;
  overflow: hidden;
}

.conversation-title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.conversation-time {
  font-size: 12px;
  color: #8a94a6;
}

.delete-conversation-btn {
  background: transparent;
  border: none;
  color: #8a94a6;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.delete-conversation-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #e74c3c;
}

.new-conversation input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
}

.new-conversation input:focus {
  border-color: #667eea;
}

.new-conversation button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.new-conversation button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
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
  
  .conversation-list {
    padding: 10px;
  }
  
  .new-conversation {
    flex-direction: column;
    gap: 8px;
  }
  
  .conversation-item {
    padding: 10px;
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

/* 邮箱验证相关样式 */
.email-verification-form {
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
  border-radius: 12px;
}

.email-form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e9ecef;
}

.email-form-header h4 {
  margin: 0;
  color: #333;
  font-size: 16px;
  font-weight: 600;
}

.close-email-form {
  background: none;
  border: none;
  cursor: pointer;
  color: #999;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.2s;
}

.close-email-form:hover {
  color: #666;
}

.email-input-group {
  margin-bottom: 16px;
}

.email-input-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.email-input-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.email-input-group input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.email-verification-message {
  margin: 12px 0;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
}

.email-verification-message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.email-verification-message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.email-verification-message.info {
  background: #d1ecf1;
  color: #0c5460;
  border: 1px solid #bee5eb;
}

.email-form-actions {
  display: flex;
  gap: 12px;
  margin-top: auto;
}

.verify-email-btn,
.continue-temp-btn,
.close-email-btn {
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.verify-email-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.verify-email-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.verify-email-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.continue-temp-btn {
  background: #28a745;
  color: white;
}

.continue-temp-btn:hover {
  background: #218838;
  transform: translateY(-1px);
}

.close-email-btn {
  background: white;
  border: 1px solid #ddd;
  color: #666;
}

.close-email-btn:hover {
  background: #f8f9fa;
  border-color: #bbb;
}

.email-btn {
  background: none;
  border: 1px solid #ddd;
  color: #666;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.email-btn:hover {
  background: #f8f9fa;
  border-color: #bbb;
}

.email-btn.verified {
  background: #d4edda;
  border-color: #c3e6cb;
  color: #155724;
}

.email-btn.verified:hover {
  background: #c3e6cb;
}

.email-status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #dc3545;
}

.email-status-indicator.verified {
  background: #28a745;
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
  
  .email-verification-form {
    background: #1a1a1a;
    color: #e0e0e0;
  }
  
  .email-form-header {
    border-bottom-color: #333;
  }
  
  .email-form-header h4 {
    color: #e0e0e0;
  }
  
  .email-input-group label {
    color: #e0e0e0;
  }
  
  .email-input-group input {
    background: #2d2d2d;
    border-color: #444;
    color: #e0e0e0;
  }
  
  .email-btn {
    background: #2d2d2d;
    border-color: #444;
    color: #e0e0e0;
  }
  
  .email-btn:hover {
    background: #333;
  }
  
  .close-email-btn {
    background: #2d2d2d;
    border-color: #444;
    color: #e0e0e0;
  }
  
  .close-email-btn:hover {
    background: #333;
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