<template>
  <div class="id-card-upload">
    <!-- 左侧上传区域 -->
    <div class="upload-container">
      <input
        ref="frontInput"
        id="frontUpload"
        type="file"
        class="upload-input"
        accept="image/*"
        @change="handleFileChange('front')"
      />
      <div v-if="!frontImage" class="upload-text">
        <label for="frontUpload" class="upload-label">
          <div><img src="@/assets/images/upload-cloud.svg" alt="" /></div>
          <div>上傳身分證<span class="bluesc">正面</span></div>
        </label>
      </div>
      <div v-else class="image-preview">
        <img
          :src="frontImage"
          alt="身分證正面預覽"
          @click="handleFileClick('front')"
        />
        <button @click="removeImage('front')">移除</button>
      </div>
    </div>

    <!-- 右侧上传区域 -->
    <div class="upload-container">
      <input
        ref="backInput"
        id="backUpload"
        type="file"
        class="upload-input"
        accept="image/*"
        @change="handleFileChange('back')"
      />
      <div v-if="!backImage" class="upload-text">
        <label for="backUpload" class="upload-label">
          <div><img src="@/assets/images/upload-cloud.svg" alt="" /></div>
          <div>上傳身分證<span class="bluesc">反面</span></div>
        </label>
      </div>
      <div v-else class="image-preview">
        <img
          :src="backImage"
          alt="身份证背面预览"
          @click="handleFileClick('back')"
        />
        <button @click="removeImage('back')">移除</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

interface UpdateEvent {
  type: 'front' | 'back'
  status: 'success' | 'error' | 'removed'
}

const emit = defineEmits<{
  (e: 'update', payload: UpdateEvent): void
}>()

const frontInput = ref<HTMLInputElement | null>(null)
const backInput = ref<HTMLInputElement | null>(null)
const frontImage = ref<string | null>(null)
const backImage = ref<string | null>(null)

const handleFileChange = (type: 'front' | 'back') => {
  const input = type === 'front' ? frontInput.value : backInput.value
  const file = input?.files ? input.files[0] : null

  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = () => {
      if (type === 'front') {
        frontImage.value = reader.result as string
      } else {
        backImage.value = reader.result as string
      }
      emit('update', { type, status: 'success' })
      ElMessage.success('圖片上傳成功')
    }
    reader.onerror = () => {
      emit('update', { type, status: 'error' })
      ElMessage.error('圖片上傳失敗')
    }
    reader.readAsDataURL(file)
  } else {
    ElMessage.error('請選擇圖片文件')
  }
}

const removeImage = (type: 'front' | 'back') => {
  if (type === 'front') {
    frontImage.value = null
    frontInput.value!.value = '' // 清空input的值
  } else {
    backImage.value = null
    backInput.value!.value = '' // 清空input的值
  }
  emit('update', { type, status: 'removed' })
}

const handleFileClick = (type: 'front' | 'back') => {
  const input = type === 'front' ? frontInput.value : backInput.value
  if (input) {
    input.click()
  }
}
</script>

<style scoped>
.id-card-upload {
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
  width: 48%; /* 调整上传区域宽度 */
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

.image-preview {
  width: 100%;
  height: 100%;
  position: relative;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* 确保图片适应容器并适当剪切 */
  cursor: pointer;
}

.image-preview button {
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
