<script setup lang="ts">
import { ref, inject, watch } from "vue";
import type { Dialog } from 'mdui/components/dialog.js';

import { useBNStateStore } from "@/stores/bnState";
import { downloadString } from "@/utils/blobTools";

import { prompt as mdPrompt } from 'mdui/functions/prompt.js';


const bnState = useBNStateStore()
const aboutDialog = inject('aboutDialog', ref<Dialog | null>(null))
const loginDialog = inject('loginDialog', ref<Dialog | null>(null))
const fileOpen = ref<HTMLInputElement | null>(null)
const openAbout = () => {
  if (!aboutDialog.value) {
    return
  };
  aboutDialog.value.open = true;
}

const openFileWindow = () => {
  if (!fileOpen.value) {
    return
  };
  fileOpen.value.click()
}

const openFile = () => {
  try {
    if (!fileOpen.value || !fileOpen.value.files || fileOpen.value.files.length <= 0) {
      return
    }
    const file = fileOpen.value.files[0]
    const reader = new FileReader()
    reader.onload = function () {
      const result = reader.result
      if (!result) {
        return
      }
      bnState.goWork(JSON.parse(String(result)), true)
    };
    if (!file) {
      return
    }
    reader.readAsText(file);
  } catch (e) {
    console.log(e)
  }
}


const saveFile = async () => {
  await bnState.syncWork()
  downloadString(JSON.stringify(bnState.bcmJson, null, 4), `${bnState.bcmJson.project_name}.json`)
}

const changeWorkName = () => {
  mdPrompt({
    headline: "重命名作品",
    confirmText: "确定",
    cancelText: "取消",
    textFieldOptions: {
      value: bnState?.bcmJson?.project_name ?? ''
    },
    onConfirm: (value) => { bnState.bcmJson.project_name = String(value) },
  });
}

const changeWorkID = () => {
  mdPrompt({
    headline: "修改作品ID",
    description: "修改后可使用云功能 (作品JSON需和云端保持一致)",
    confirmText: "确定",
    cancelText: "取消",
    textFieldOptions: {
      value: String(bnState.workId),
      type: 'number'
    },
    onConfirm: (value) => {
      bnState.goWork(bnState.bcmJson, undefined, Number(value))
    },
  });
}

watch(
  () => bnState.isPad,
  () => {
    bnState.goWork(bnState.bcmJson, true)
  }
);
</script>
<template>
  <div class="top-app-bar-menu">
    <mdui-dropdown>
      <mdui-button variant="outlined" slot="trigger" class="pc-menu-button">文件</mdui-button>
      <mdui-menu>
        <mdui-menu-item @click="bnState.newWork(true)">新建作品</mdui-menu-item>
        <mdui-menu-item>打开作品</mdui-menu-item>
        <mdui-divider></mdui-divider>
        <mdui-menu-item @click="openFileWindow()">打开本地作品</mdui-menu-item>
        <mdui-menu-item @click="saveFile()">下载作品</mdui-menu-item>
      </mdui-menu>
    </mdui-dropdown>
    <mdui-dropdown>
      <mdui-button variant="outlined" slot="trigger" class="pc-menu-button">作品</mdui-button>
      <mdui-menu>
        <mdui-menu-item @click="changeWorkName()">重命名</mdui-menu-item>
        <mdui-menu-item>
          高级
          <mdui-menu-item slot="submenu" @click="bnState.isPad = !bnState.isPad">修改编辑器UI类型</mdui-menu-item>
          <mdui-menu-item slot="submenu" @click="changeWorkID()">修改作品ID</mdui-menu-item>
        </mdui-menu-item>
      </mdui-menu>
    </mdui-dropdown>
    <mdui-dropdown>
      <mdui-button variant="outlined" slot="trigger" class="pc-menu-button">账号</mdui-button>
      <mdui-menu>
        <mdui-menu-item @click="loginDialog!.open = true">登录</mdui-menu-item>
      </mdui-menu>
    </mdui-dropdown>
    <mdui-dropdown>
      <mdui-button variant="outlined" slot="trigger" class="pc-menu-button">帮助</mdui-button>
      <mdui-menu>
        <mdui-menu-item @click="openAbout()">关于 BetterNemo-Online</mdui-menu-item>
      </mdui-menu>
    </mdui-dropdown>
  </div>
  <input type="file" class="file-open" ref="fileOpen" accept=".json" title="打开本地作品" @change="openFile()" />
</template>
<style scoped>
.top-app-bar-menu {
  display: flex;
  align-items: center;
  gap: 8px;
}

.json-editor {
  width: 600px;
}

.file-open {
  display: none;
}
</style>
