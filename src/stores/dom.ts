import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDomStore = defineStore('dom', () => {
  const iframeRef = ref<HTMLIFrameElement | null>(null)
  return { iframeRef }
})
