<!-- ParentComponent.vue -->
<template>
  <div class="home_view">
    <div v-if="!signatureImage" class="signature" @click="openSignatureDialog">
      签名
    </div>
    <div
      v-if="signatureImage"
      @click="openSignatureDialog"
      class="signature-display"
    >
      <img :src="signatureImage" alt="签名图片" class="signature-img" />
    </div>
    <HandSignature
      v-model:dialogVisible="dialogVisible"
      @signatureSubmitted="handleSignatureSubmitted"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dialogVisible = ref(false)
const signatureImage = ref<string | null>(null)

const openSignatureDialog = () => {
  dialogVisible.value = true
}

const handleSignatureSubmitted = (image: string) => {
  signatureImage.value = image
}
</script>

<style scoped>
.home_view {
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.signature-display {
  margin-top: 20px;
  text-align: center;
}

.signature-img {
  /* border: 1px solid #000; */
  border-radius: 6px;
  width: 150px;
  height: 50px;
  background: #fcd4d4;
}

.signature {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 50px;
  background: #fcd4d4;
  color: #0000008d;
}
</style>
