<script setup lang="ts">
import { ref, provide } from "vue";
import type { Dialog } from 'mdui/components/dialog.js';

const aboutDialog = ref<Dialog | null>(null)
const openAbout = () => {
  if (!aboutDialog.value) {
    return
  };
  aboutDialog.value.open = true;
}

const closeAbout = () => {
  if (!aboutDialog.value) {
    return
  };
  aboutDialog.value.open = false;
}

provide('aboutDialog', aboutDialog)
</script>

<template>
  <mdui-layout>
    <mdui-top-app-bar class="top-app-bar" scroll-behavior="elevate" scroll-threshold="0">
      <mdui-dropdown>
        <mdui-button-icon icon="menu" slot="trigger" class="pc-menu-button"></mdui-button-icon>
        <mdui-menu>
          <mdui-menu-item>新建作品</mdui-menu-item>
          <mdui-menu-item>打开作品</mdui-menu-item>
          <mdui-divider></mdui-divider>
          <mdui-menu-item @click="openAbout()">关于 BetterNemo-Online</mdui-menu-item>
        </mdui-menu>
      </mdui-dropdown>
      <mdui-top-app-bar-title>BetterNemo-Online</mdui-top-app-bar-title>
    </mdui-top-app-bar>
    <RouterView />
  </mdui-layout>
  <mdui-dialog class="about-dialog" ref="aboutDialog" close-on-overlay-click>
    <span class="about-dialog-description">BetterNemo-Online<br>
      Powered By BetterNemo开发组
    </span>
    <mdui-button slot="action" @click="closeAbout()">确定</mdui-button>
  </mdui-dialog>

</template>

<style scoped>
@media (max-width: 768px) {
  .top-app-bar {
    display: none;
  }
}
</style>
