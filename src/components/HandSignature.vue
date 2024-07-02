<!-- UploadIDCard.vue -->
<template>
  <div class="cont">
    <!-- 弹框 -->
    <el-dialog v-model="internalDialogVisible" title="签名板" width="96%">
      <div class="signature-container">
        <canvas ref="canvas" class="signature-canvas"></canvas>
        <div class="button-container">
          <el-button @click="clearCanvas">清除</el-button>
          <el-button type="primary" @click="submitSignature">提交</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:dialogVisible', 'signatureSubmitted'])

const internalDialogVisible = ref(props.dialogVisible)

watch(internalDialogVisible, newVal => {
  emit('update:dialogVisible', newVal)
})

watch(
  () => props.dialogVisible,
  newVal => {
    internalDialogVisible.value = newVal
  }
)

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let isDrawing = false
let lastX = 0
let lastY = 0

const draw = (x: number, y: number) => {
  if (!ctx) return
  ctx.strokeStyle = '#000'
  ctx.lineWidth = 2
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  ctx.beginPath()
  ctx.moveTo(lastX, lastY)
  ctx.lineTo(x, y)
  ctx.stroke()
  ;[lastX, lastY] = [x, y]
}

const handleMouseDown = (e: MouseEvent) => {
  isDrawing = true
  ;[lastX, lastY] = [e.offsetX, e.offsetY]
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isDrawing) return
  draw(e.offsetX, e.offsetY)
}

const handleTouchStart = (e: TouchEvent) => {
  e.preventDefault()
  if (e.touches.length === 1) {
    const touch = e.touches[0]
    const rect = (canvas.value as HTMLCanvasElement).getBoundingClientRect()
    ;[lastX, lastY] = [touch.clientX - rect.left, touch.clientY - rect.top]
    isDrawing = true
  }
}

const handleTouchMove = (e: TouchEvent) => {
  e.preventDefault()
  if (e.touches.length === 1 && isDrawing) {
    const touch = e.touches[0]
    const rect = (canvas.value as HTMLCanvasElement).getBoundingClientRect()
    draw(touch.clientX - rect.left, touch.clientY - rect.top)
  }
}

const handleMouseUpOrOut = () => {
  isDrawing = false
}

const handleTouchEnd = () => {
  isDrawing = false
}

const clearCanvas = () => {
  if (ctx && canvas.value) {
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
  }
}

const isCanvasBlank = (canvas: HTMLCanvasElement) => {
  const blank = document.createElement('canvas')
  blank.width = canvas.width
  blank.height = canvas.height
  return canvas.toDataURL() === blank.toDataURL()
}

const submitSignature = () => {
  if (canvas.value) {
    if (isCanvasBlank(canvas.value)) {
      ElMessage.warning('请签名')
    } else {
      const dataURL = canvas.value.toDataURL('image/png')
      ElMessage.success('签名已保存')
      emit('signatureSubmitted', dataURL)
      internalDialogVisible.value = false
    }
  }
}

const setCanvasResolution = () => {
  if (canvas.value) {
    const ratio = window.devicePixelRatio || 1
    canvas.value.width = canvas.value.offsetWidth * ratio
    canvas.value.height = canvas.value.offsetHeight * ratio
    ctx = canvas.value.getContext('2d')
    if (ctx) {
      ctx.scale(ratio, ratio)
    }
  }
}

onMounted(() => {
  watch(internalDialogVisible, newVal => {
    if (newVal) {
      setTimeout(() => {
        setCanvasResolution()
        if (canvas.value) {
          canvas.value.addEventListener('mousedown', handleMouseDown)
          canvas.value.addEventListener('mousemove', handleMouseMove)
          canvas.value.addEventListener('mouseup', handleMouseUpOrOut)
          canvas.value.addEventListener('mouseout', handleMouseUpOrOut)

          canvas.value.addEventListener('touchstart', handleTouchStart, {
            passive: false
          })
          canvas.value.addEventListener('touchmove', handleTouchMove, {
            passive: false
          })
          canvas.value.addEventListener('touchend', handleTouchEnd)
        }
      }, 100)
    } else {
      if (canvas.value) {
        canvas.value.removeEventListener('mousedown', handleMouseDown)
        canvas.value.removeEventListener('mousemove', handleMouseMove)
        canvas.value.removeEventListener('mouseup', handleMouseUpOrOut)
        canvas.value.removeEventListener('mouseout', handleMouseUpOrOut)

        canvas.value.removeEventListener('touchstart', handleTouchStart)
        canvas.value.removeEventListener('touchmove', handleTouchMove)
        canvas.value.removeEventListener('touchend', handleTouchEnd)
      }
    }
  })
})
</script>

<style scoped>
:deep(.el-dialog) {
  padding: 16px 6px;
}
.cont {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.signature-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.signature-canvas {
  border: 1px solid #000;
  width: 92vw;
  height: 200px;
  background: #fff;
  touch-action: none;
  border-radius: 6px;
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 10px;
}
</style>
