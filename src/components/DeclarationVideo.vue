<template>
  <div class="DeclarationVideo">
    <div class="upload-container">
      <input
        ref="DeclarationVideoInput"
        id="DeclarationVideoUpload"
        type="file"
        class="upload-input"
        accept="video/*"
        @change="DeclarationVideoChange('DeclarationVideo')"
      />
      <div v-if="!DeclarationVideoVideo" class="upload-text">
        <label for="DeclarationVideoUpload" class="upload-label">
          <div><img src="@/assets/images/upload-cloud.svg" alt="" /></div>
          <div>上傳聲明影片</div>
        </label>
      </div>
      <div v-else class="video-preview">
        <video
          :src="DeclarationVideoVideo"
          controls
          @click="DeclarationVideoClick('DeclarationVideo')"
        ></video>
        <button @click="removeVideo('DeclarationVideo')">移除</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

interface UpdateEvent {
  type: 'DeclarationVideo' | 'back'
  status: 'success' | 'error' | 'removed'
}

const emit = defineEmits<{
  (e: 'update', payload: UpdateEvent): void
}>()

const DeclarationVideoInput = ref<HTMLInputElement | null>(null)
const DeclarationVideoVideo = ref<string | null>(null)

const DeclarationVideoChange = (type: 'DeclarationVideo' | 'back') => {
  const input = type === 'DeclarationVideo' ? DeclarationVideoInput.value : null
  const file = input?.files ? input.files[0] : null

  if (file) {
    if (file.type.startsWith('video/')) {
      const reader = new FileReader()
      reader.onload = () => {
        if (type === 'DeclarationVideo') {
          DeclarationVideoVideo.value = reader.result as string
        }
        emit('update', { type, status: 'success' })
        ElMessage.success('影片上傳成功')
      }
      reader.onerror = () => {
        emit('update', { type, status: 'error' })
        ElMessage.error('影片上傳失敗')
      }
      reader.readAsDataURL(file)
    } else {
      ElMessage.error('請選擇視訊文件')
      input!.value = '' // 清空输入以防止再次选择相同文件
    }
  }
}

const removeVideo = (type: 'DeclarationVideo') => {
  if (type === 'DeclarationVideo') {
    DeclarationVideoVideo.value = null
    DeclarationVideoInput.value!.value = '' // 清空input的值
  }
  emit('update', { type, status: 'removed' })
}

const DeclarationVideoClick = (type: 'DeclarationVideo') => {
  const input = type === 'DeclarationVideo' ? DeclarationVideoInput.value : null
  if (input) {
    input.click()
  }
}
</script>

<style scoped>
.DeclarationVideo {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
}

.upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 99%; /* 调整上传区域宽度 */
  height: 200px; /* 调整上传区域高度 */
  border-radius: 4px;
  border: 1px dashed #dcdfe6;
  background: #fff;
  position: relative; /* 使按钮的定位生效 */
  overflow: hidden; /* 防止内容溢出 */
}

.upload-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.upload-label {
  font-size: 16px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--Neutral-Color-Font-Regular, #606266);
  font-variant-numeric: lining-nums tabular-nums;
  font-family: 'Noto Sans SC';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 157.143% */
}

.bluesc {
  color: #005efe;
  font-variant-numeric: lining-nums tabular-nums;
  margin-left: 4px;
  font-family: 'Noto Sans SC';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
}

.upload-input {
  display: none;
}

.video-preview {
  width: 100%;
  height: 100%;
  position: relative;
}

.video-preview video {
  width: 100%;
  height: 100%;
  object-fit: contain; /* 确保视频适应容器并适当剪切 */
  cursor: pointer;
}

.video-preview button {
  position: absolute;
  top: 5px;
  right: 5px;
  border-radius: 4px;
  font-size: 12px;
  background: #dcdfe6;
  border: none;
  padding: 5px;
  cursor: pointer;
  color: #005efe;
}
</style>
