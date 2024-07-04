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
      <label v-if="!frontImage" for="frontUpload" class="upload-label">
        <div v-loading="loading" class="upload-text">
          <div><img src="@/assets/images/upload-cloud.svg" alt="" /></div>
          <div>上傳身分證<span class="bluesc">正面</span></div>
        </div>
      </label>
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
      <label v-if="!backImage" for="backUpload" class="upload-label">
        <div v-loading="loading1" class="upload-text">
          <div><img src="@/assets/images/upload-cloud.svg" alt="" /></div>
          <div>上傳身分證<span class="bluesc">反面</span></div>
        </div>
      </label>
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
  const file = input?.files ? input.files[0] : null

  if (file && file.type.startsWith('image/')) {
    // 立即开始转换状态
    if (type === 'idcardf') {
      loading.value = true
    } else if (type === 'idcardb') {
      loading1.value = true
    }

    const reader = new FileReader()
    const formData = new FormData()

    formData.append(`${props.id}_${type}`, file)

    reader.onload = () => {
      if (type === 'idcardf') {
        frontImage.value = reader.result as string
      } else if (type === 'idcardb') {
        backImage.value = reader.result as string
      }
    }

    reader.onerror = () => {
      emit('update', { type, status: 'error' })
      ElMessage.error('圖片讀取失敗')
    }

    try {
      const response = await uploadImage(formData, 'multipart/form-data')
      if (response.data.code === 0) {
        emit('update', { type, status: 'success' })
        ElMessage.success('圖片上傳成功')

        // 上传成功后结束转圈圈
        if (type === 'idcardf') {
          loading.value = false
        } else if (type === 'idcardb') {
          loading1.value = false
        }

        reader.readAsDataURL(file)
      } else {
        emit('update', { type, status: 'error' })
        ElMessage.error('圖片上傳失敗')

        // 上传失败也要结束转圈圈
        if (type === 'idcardf') {
          loading.value = false
        } else if (type === 'idcardb') {
          loading1.value = false
        }
      }
    } catch (error) {
      emit('update', { type, status: 'error' })
      ElMessage.error('圖片上傳失敗')

      // 异常情况也要结束转圈圈
      if (type === 'idcardf') {
        loading.value = false
      } else if (type === 'idcardb') {
        loading1.value = false
      }
    }
  } else {
    ElMessage.error('請選擇圖片文件')
  }
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
  width: 100%; /* 调整上传区域宽度 */
  height: 200px; /* 调整上传区域高度 */
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
