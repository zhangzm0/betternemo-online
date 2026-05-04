<script setup lang="ts">
import { ref, inject } from "vue";
import type { Dialog } from 'mdui/components/dialog.js';

const aboutDialog = inject('aboutDialog', ref<Dialog | null>(null))
const openAbout = () => {
  if (!aboutDialog.value) {
    return
  };
  aboutDialog.value.open = true;
}
</script>

<template>
  <mdui-navigation-rail contained divider value="code" class="navigation-rail">
    <mdui-dropdown placement="right-start">
      <div slot="trigger">
        <mdui-button-icon icon="menu" slot="top" class="phone-menu-button"></mdui-button-icon>
      </div>
      <mdui-menu>
        <mdui-menu-item>新建作品</mdui-menu-item>
        <mdui-menu-item>打开作品</mdui-menu-item>
        <mdui-divider></mdui-divider>
        <mdui-menu-item @click="openAbout()">关于 BetterNemo-Online</mdui-menu-item>
      </mdui-menu>
    </mdui-dropdown>
    <mdui-navigation-rail-item icon="code" value="code"></mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="people" value="actor"></mdui-navigation-rail-item>
    <mdui-button-icon icon="play_arrow" slot="bottom" variant="filled"></mdui-button-icon>
  </mdui-navigation-rail>
  <mdui-layout-main class="bn">
    <h1>占位符</h1>
  </mdui-layout-main>
</template>

<style scoped>
.navigation-rail {
  z-index: 0;
}

.bn {
  height: 100vh;
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
