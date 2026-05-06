<script setup lang="ts">
import { ref, provide, watchEffect } from "vue";
import type { Dialog } from 'mdui/components/dialog.js';

import AppBarMenu from "./components/AppBarMenu.vue";

//import { useBNStateStore } from "@/stores/bnState";
//const bnState = useBNStateStore()

const aboutDialog = ref<Dialog | null>(null)
const showOperate = ref(window.localStorage.getItem('showOperate') == 'true')

const closeAbout = () => {
  if (!aboutDialog.value) {
    return
  };
  aboutDialog.value.open = false;
}

watchEffect(() => {
  window.localStorage.setItem("showOperate", String(showOperate.value))
})

provide('aboutDialog', aboutDialog)
</script>

<template>
  <mdui-layout>
    <mdui-top-app-bar class="top-app-bar" scroll-behavior="elevate" scroll-threshold="0">
      <mdui-button-icon icon="web"></mdui-button-icon>
      <mdui-top-app-bar-title>
        <div class="top-app-bar-title">
          <span>BetterNemo-Online</span>
          <AppBarMenu v-if="!showOperate" />
        </div>
      </mdui-top-app-bar-title>
      <div class="show-more-operate">
        <span>展开</span>
        <mdui-switch checked-icon="" :checked="showOperate" @change="showOperate = $event.target.checked"></mdui-switch>
      </div>
    </mdui-top-app-bar>
    <mdui-top-app-bar class="operate-top-app-bar" v-if="showOperate">
      <AppBarMenu />
    </mdui-top-app-bar>
    <RouterView />
  </mdui-layout>
  <mdui-dialog class="about-dialog" ref="aboutDialog" close-on-overlay-click>
    <span class="about-dialog-description">BetterNemo-Online<br>
      Powered By BetterNemo开发组<br>
      产品任何疑惑及问题其最终解释权归BetterNemo团队所有
    </span>
    <mdui-button slot="action" @click="closeAbout()">确定</mdui-button>
  </mdui-dialog>

</template>

<style scoped>
.top-app-bar-title {
  display: flex;
  align-items: center;
  gap: 16px;
}

.show-more-operate {
  display: flex;
  align-items: center;
  gap: 8px;
}

.operate-top-app-bar {
  gap: 16px;
  padding-left: 24px;
  padding-top: 2px;
  height: 52px;
  z-index: 1;
}

@media (max-width: 768px) {

  .top-app-bar,
  .operate-top-app-bar {
    display: none;
  }
}
</style>
