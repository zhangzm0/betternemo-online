<script setup lang="ts">
import { ref, inject } from "vue";
import type { Dialog } from 'mdui/components/dialog.js';

import { useBNStateStore } from "@/stores/bnState";
import { downloadString } from "@/utils/blobTools";

interface SaveDataResult {
  xml: Record<string, any>;
  block_count: number;
  block_count_visible_only: number;
  variable_dict: Record<string, any>;
  broadcast_dict: Record<string, any>;
  split_options: Record<string, any>;
  procedure_dict: Record<string, any>;
  toolbox: {
    devices: any[];
  };
}

const bnState = useBNStateStore()
const aboutDialog = inject('aboutDialog', ref<Dialog | null>(null))
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
  const iframeWin: any = bnState.iframeRef?.contentWindow;
  if (!iframeWin || !iframeWin._dsaf) {
    console.error("iframe未加载完成或不同域");
    return;
  }
  let blocksInfo = {}
  let workResult: SaveDataResult = {
    "xml": { "": '' }, "block_count": 0, 'block_count_visible_only': 0, 'variable_dict': {}, 'broadcast_dict': {}, 'split_options': {}, 'procedure_dict': {}, "toolbox": {
      "devices": []
    }
  }
  const result: SaveDataResult = await new Promise((resolve) => {
    iframeWin._dsaf.postMessageAsyn(
      "REQUEST_ALL_SAVE_DATA",
      {},
      resolve
    );
  });

  workResult = result;
  blocksInfo = result.xml;
  const actors_dict = bnState.bcmJson.actors.actors_dict
  const scenes_dict = bnState.bcmJson.scenes.scenes_dict
  for (const blockName of Object.keys(blocksInfo)) {
    if (Object.keys(actors_dict).includes(blockName)) {
      actors_dict[blockName as keyof typeof actors_dict].blocksXML = blocksInfo[blockName as keyof typeof blocksInfo]
    } else if (Object.keys(scenes_dict).includes(blockName)) {
      scenes_dict[blockName as keyof typeof scenes_dict].blocksXML = blocksInfo[blockName as keyof typeof blocksInfo]
    }
  }
  console.log(workResult)
  bnState.bcmJson.block_count.all_block_count = workResult.block_count
  bnState.bcmJson.block_count.visible_block_count = workResult.block_count_visible_only
  bnState.bcmJson.toolbox = workResult.toolbox
  bnState.bcmJson.variable.variable_dict = workResult.variable_dict as any
  bnState.bcmJson.broadcast.broadcast_dict = workResult.broadcast_dict as any
  bnState.bcmJson.procedures.procedure_dict = workResult.procedure_dict as any
  bnState.bcmJson.split_options.options_dict = workResult.split_options as any
  downloadString(JSON.stringify(bnState.bcmJson, null, 4), `${bnState.bcmJson.project_name}.json`)
}
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
      <mdui-button variant="outlined" slot="trigger" class="pc-menu-button" disabled>作品</mdui-button>
      <mdui-menu>
        <mdui-menu-item>重命名</mdui-menu-item>
        <mdui-menu-item>高级</mdui-menu-item>
      </mdui-menu>
    </mdui-dropdown>
    <mdui-dropdown>
      <mdui-button variant="outlined" slot="trigger" class="pc-menu-button" disabled>账号</mdui-button>
      <mdui-menu>
        <mdui-menu-item>登录</mdui-menu-item>
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

.file-open {
  display: none;
}
</style>
