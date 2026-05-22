<script setup lang="ts">
import { nextTick, computed } from "vue";

import { useBNStateStore } from "@/stores/bnState";

import BN from "@/components/BN.vue";
import AppBarMenu from "@/components/AppBarMenu.vue";
import MonacoEditor from "@/components/MonacoEditor.vue";
import { usePagesStore } from "@/stores/pages";

const bnState = useBNStateStore()
const pages = usePagesStore()
const jsonText = computed({
  get() {
    return JSON.stringify(bnState.bcmJson, null, 4)
  },
  set(val) {
    try {
      bnState.bcmJson = JSON.parse(val)
      bnState.goWork(bnState.bcmJson)
    } catch (e) {
      console.log('JSON 格式错误', e)
    }
  }
})
const playWork = () => {
  nextTick(() => {
    bnState.isPlay = !bnState.isPlay
    pages.changePage('actor')
  })
}
</script>

<template>
  <mdui-navigation-rail contained divider :value="pages.currentName" class="navigation-rail">
    <mdui-dropdown placement="right-start">
      <div slot="trigger">
        <mdui-button-icon icon="menu" slot="top" class="phone-menu-button"></mdui-button-icon>
      </div>
      <mdui-menu class="phone-menu">
        <AppBarMenu />
      </mdui-menu>
    </mdui-dropdown>
    <mdui-navigation-rail-item icon="code" value="jsonEditor" v-if="!bnState.isZipWork"
      @click="pages.changePage('jsonEditor')"></mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="people" value="actor"
      @click="pages.changePage('actor')"></mdui-navigation-rail-item>
    <mdui-button-icon :icon="!bnState.isPlay ? 'play_arrow' : 'pause'" slot="bottom" variant="filled"
      @click="playWork()"></mdui-button-icon>
  </mdui-navigation-rail>
  <mdui-layout-main class="bn">
    <BN class="bn-editor" :class="pages.currentName" />
    <MonacoEditor class="monaco-editor" :class="pages.currentName" v-model="jsonText" />
  </mdui-layout-main>
</template>

<style scoped>
.navigation-rail {
  z-index: 0;
}

.bn {
  height: 100vh;
}

.bn-editor.jsonEditor {
  display: none;
}

.monaco-editor {
  display: none;
  height: 100%;
}

.monaco-editor.jsonEditor {
  display: block;
  height: 100%;
}


.phone-menu {
  padding: 8px;
  max-width: 100%;
}

.phone-menu-button {
  display: none;
}

@media (max-width: 768px) {
  .phone-menu-button {
    display: block;
  }
}
</style>
