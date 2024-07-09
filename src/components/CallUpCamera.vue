<template>
  <div class="test">
    <!-- 画笔控件 用来拍照 -->
    <canvas style="display: none" ref="canvasDom" />
    <div class="bg">
      <div v-if="permissionDenied" class="x"></div>
      <!-- 播放器，用来播放拍摄的视频 -->
      <video v-if="!imgurl" class="camera_video" ref="videoDom" playsinline />
      <!--  显示照片  -->
      <img v-else :src="imgurl" />
    </div>
    <el-button @click="takePhoto">{{ imgurl ? '重拍' : '拍照' }}</el-button>
    <div v-if="permissionDenied" class="HuoQu" @click="requestCameraPermission">
      请点击获取摄像头权限
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref, onMounted } from 'vue'

// canvas控件对象
const canvasDom = ref<HTMLCanvasElement | null>(null)
// video 控件对象
const videoDom = ref<HTMLVideoElement | null>(null)
// 照片路径
const imgurl = ref<string | null>(null)

// 权限拒绝标志
const permissionDenied = ref(false)

const openCamera = () => {
  // 重置权限拒绝标志
  permissionDenied.value = false
  // 检测浏览器是否支持mediaDevices
  if (navigator.mediaDevices) {
    navigator.mediaDevices
      // 开启视频，关闭音频
      .getUserMedia({ audio: false, video: { facingMode: 'user' } })
      .then(stream => {
        if (videoDom.value) {
          // 将视频流传入video控件
          videoDom.value.srcObject = stream
          // 播放
          videoDom.value
            .play()
            .then(() => {})
            .catch(err => {
              // console.error('Error playing video:', err)
            })
        }
      })
      .catch(err => {
        console.error('Error accessing camera:', err)
        // 用户拒绝摄像头权限
        permissionDenied.value = true
      })
  } else {
    ElMessage.error('该浏览器不支持开启摄像头，请更换最新版浏览器')
  }
}

const requestCameraPermission = () => {
  openCamera()
}

// 拍照
const takePhoto = () => {
  if (permissionDenied.value) {
    openCamera()
    ElMessage.error('请打开摄像头')
    return
  }
  // 如果已经拍照了就重新启动摄像头
  if (imgurl.value) {
    imgurl.value = null
    openCamera()
    return
  }

  if (canvasDom.value && videoDom.value) {
    // 设置画布大小与摄像大小一致
    canvasDom.value.width = videoDom.value.videoWidth
    canvasDom.value.height = videoDom.value.videoHeight
    // 执行画的操作
    canvasDom.value.getContext('2d')?.drawImage(videoDom.value, 0, 0)
    // 将结果转换为可展示的格式
    imgurl.value = canvasDom.value.toDataURL('image/webp')
    // 关闭摄像头
    stop()
  }
}

// 关闭摄像头
const stop = () => {
  if (videoDom.value && videoDom.value.srcObject) {
    const stream = videoDom.value.srcObject as MediaStream
    stream.getTracks().forEach(track => track.stop())
  }
}

// 打开摄像头
onMounted(() => {
  openCamera()
})
</script>

<style scoped lang="less">
.test {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  position: relative;
}

.camera_video {
  width: 100%;
  height: 100%;
}

.bg {
  width: 300px;
  height: 400px;
  background: #ffffff6b;
}
.x {
  position: absolute;
  width: 300px;
  height: 400px;
  background: rgba(0, 0, 0, 0.355) !important;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.355);
  z-index: 1;
}

.HuoQu {
  position: absolute;
  color: #000;
  font-size: 24px;
  z-index: 100;
  top: 40%;
  cursor: pointer;
}
</style>
