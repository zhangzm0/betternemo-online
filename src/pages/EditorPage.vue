<script setup lang="ts">
import { useBNStateStore } from "@/stores/bnState";

import BN from "@/components/BN.vue";
import AppBarMenu from "@/components/AppBarMenu.vue";

const bnState = useBNStateStore()
const playWork = () => {
  bnState.isPlay = !bnState.isPlay
  bnState.isActorPage = !bnState.isActorPage
}
</script>

<template>
  <mdui-navigation-rail contained divider :value="bnState.isActorPage ? 'actor' : 'code'" class="navigation-rail">
    <mdui-dropdown placement="right-start">
      <div slot="trigger">
        <mdui-button-icon icon="menu" slot="top" class="phone-menu-button"></mdui-button-icon>
      </div>
      <mdui-menu class="phone-menu">
        <AppBarMenu />
      </mdui-menu>
    </mdui-dropdown>
    <mdui-navigation-rail-item icon="code" value="code"
      @click="bnState.isActorPage = false"></mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="people" value="actor"
      @click="bnState.isActorPage = true"></mdui-navigation-rail-item>
    <mdui-button-icon :icon="!bnState.isPlay ? 'play_arrow' : 'pause'" slot="bottom" variant="filled"
      @click="playWork()"></mdui-button-icon>
  </mdui-navigation-rail>
  <mdui-layout-main class="bn">
    <BN />
  </mdui-layout-main>
</template>

<style scoped>
.navigation-rail {
  z-index: 0;
}

.bn {
  height: 100vh;
}

.phone-menu {
  padding: 8px;
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
