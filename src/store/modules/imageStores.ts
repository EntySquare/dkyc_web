// store/imageStore.ts
import { clear } from 'console'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useImageStore = defineStore('imageStore', {
  state: () => ({
    frontImage: '',
    backImage: '',
    frontStatus: ref('未上传'),
    backStatus: ref('未上传'),
    DeclarationVideoVideo: ref<string | null>(null),
    videoHandleStatus: ref('未上传'),

  }
  ),
  actions: {
    setFrontImage(image: string) {
      this.frontImage = image
    },
    setBackImage(image: string) {
      this.backImage = image
    },
    setDeclarationVideoVideo(video: string | null) {
      this.DeclarationVideoVideo = video
    },
    clearImages() {
      this.frontImage = ''
      this.backImage = ''
    },
    clearDeclarationVideo() {
      this.DeclarationVideoVideo = null
    }
  }
})
export default useImageStore