<script setup lang="ts"></script>

<template>
  <mdui-navigation-rail contained divider value="code" class="navigation-rail">
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
</style>
