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
        @change="handleFileChange('idcardf')"
      />
      <div v-loading="loading" v-if="!frontImage" class="upload-text">
        <label for="frontUpload" class="upload-label">
          <div><img src="@/assets/images/upload-cloud.svg" alt="" /></div>
          <div>上傳身分證<span class="bluesc">正面</span></div>
        </label>
      </div>
      <div v-loading="loading" v-else class="image-preview">
        <img
          :src="frontImage"
          alt="身分證正面預覽"
          @click="handleFileClick('idcardf')"
        />
        <button @click="removeImage('idcardf')">移除</button>
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
        @change="handleFileChange('idcardb')"
      />
      <div v-loading="loading1" v-if="!backImage" class="upload-text">
        <label for="backUpload" class="upload-label">
          <div><img src="@/assets/images/upload-cloud.svg" alt="" /></div>
          <div>上傳身分證<span class="bluesc">反面</span></div>
        </label>
      </div>
      <div v-loading="loading1" v-else class="image-preview">
        <img
          :src="backImage"
          alt="身份证背面预览"
          @click="handleFileClick('idcardb')"
        />
        <button @click="removeImage('idcardb')">移除</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import axios from 'axios'
import { uploadImage } from '@/api/upload'

interface UpdateEvent {
  type: 'idcardf' | 'idcardb'
  status: 'success' | 'error' | 'removed'
}
const loading = ref(false)
const loading1 = ref(false)
const props = defineProps<{ id: string }>()
const emit = defineEmits<{
  (e: 'update', payload: UpdateEvent): void
}>()

const frontInput = ref<HTMLInputElement | null>(null)
const backInput = ref<HTMLInputElement | null>(null)
const frontImage = ref<string | null>(null)
const backImage = ref<string | null>(null)

const uploadFile = async (
  file: File,
  type: 'idcardf' | 'idcardb' | 'pdf' | 'video'
) => {}

const handleFileChange = async (type: 'idcardf' | 'idcardb') => {
  const input = type === 'idcardf' ? frontInput.value : backInput.value
  const file = input?.files ? input.files![0] : null

  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = () => {
      if (type === 'idcardf') {
        frontImage.value = reader.result as string
      } else {
        backImage.value = reader.result as string
      }
    }
    reader.onerror = () => {
      emit('update', { type, status: 'error' })
      ElMessage.error('圖片讀取失敗')
    }
    // 上传开始
    loading.value = true
    const formData = new FormData()
    // todo abcdefg改成random16DigitNumber
    // 身份证正面 idcardf 背面 idcardb pdf pdf 视频 video
    console.log('props.id', props.id)

    formData.append(`${props.id}_idcardf`, file)
    try {
      // todo http://192.168.10.229:4321/app去掉，拦截器的地方把VITE_API_BASE_URL配置进去

      const response = await uploadImage(formData, 'multipart/form-data')
      if (response.data.code === 0) {
        emit('update', { type, status: 'success' })
        ElMessage.success('圖片上傳成功')
        reader.readAsDataURL(file)
      } else {
        emit('update', { type, status: 'error' })
        ElMessage.error('圖片上傳失敗')
      }
    } catch (error) {
      emit('update', { type, status: 'error' })
      ElMessage.error('圖片上傳失敗')
    }
  } else {
    ElMessage.error('請選擇圖片文件')
  }
  loading.value = false
  //上传结束
}

const removeImage = (type: 'idcardf' | 'idcardb') => {
  if (type === 'idcardf') {
    frontImage.value = null
    frontInput.value!.value = '' // 清空input的值
  } else {
    backImage.value = null
    backInput.value!.value = '' // 清空input的值
  }
  emit('update', { type, status: 'removed' })
}

const handleFileClick = (type: 'idcardf' | 'idcardb') => {
  const input = type === 'idcardf' ? frontInput.value : backInput.value
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
