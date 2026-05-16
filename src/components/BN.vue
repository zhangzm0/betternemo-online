<script setup lang="ts">
import { ref, onBeforeUnmount, watchEffect } from 'vue'
import { snackbar } from "mdui/functions/snackbar.js";
import { getBridgeInstance, clearBridgeInstance } from '@/utils/bridgeInstance'
import { useBNStateStore } from "@/stores/bnState";
import { usePagesStore } from '@/stores/pages';

// 组件状态

const bnState = useBNStateStore()
const pages = usePagesStore()
const isLoaded = ref(false)

const iframeRef = ref<any>(null)

function onIframeLoad() {
  const iframeDom = iframeRef.value
  if (!iframeDom) return
  // 同步真实DOM到Store
  bnState.iframeRef = iframeDom
  // 初始化默认作品
  if (!isLoaded.value) { bnState.newWork() }
  isLoaded.value = true
}

function onIframeError() {
  console.error('iframe 加载失败')
  snackbar({ message: 'iframe页面加载失败', closeable: true })
}

onBeforeUnmount(() => {
  // 销毁bridge实例，移除监听
  clearBridgeInstance()
})

watchEffect(() => {
  const { isPlay } = bnState
  const currentName = pages.currentName
  const workName = bnState.bcmJson.project_name
  const bridgeInstance: any = getBridgeInstance()
  if (!bridgeInstance) {
    return
  }
  document.title = `BetterNemo-Online : ${workName}`
  bridgeInstance.sendNativeMessage('SET_THEATRE_VISIBLE', currentName == 'actor')
  bridgeInstance.sendNativeMessage('SET_RUN_STATE', isPlay)
})
</script>

<template>
  <div class="bn-webview">
    <iframe @error="onIframeError" @load="onIframeLoad" src="/betternemo-online/bn/workspace.html"
      class="bn-webview-iframe" ref="iframeRef"></iframe>
  </div>
</template>

<style scoped>
.bn-webview {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.bn-webview-iframe {
  border: 0;
  height: 100%;
  width: 100%;
}
</style>
