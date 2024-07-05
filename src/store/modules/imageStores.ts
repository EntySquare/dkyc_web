// store/imageStore.ts
import { defineStore } from 'pinia'

 const useImageStore = defineStore('imageStore', {
  state: () => ({
    frontImage: '',
    backImage: ''
  } 
  ),
  actions: {
    setFrontImage(image: string) {
      this.frontImage = image
    },
    setBackImage(image: string) {
      this.backImage = image
    },
    clearImages() {
      this.frontImage = ''
      this.backImage = ''
    }
  }
})
export default useImageStore