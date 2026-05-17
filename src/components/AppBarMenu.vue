<script setup lang="ts">
import { ref, inject, watch, onMounted } from "vue";
import type { Dialog } from 'mdui/components/dialog.js';

import { useBNStateStore } from "@/stores/bnState";
import { downloadString } from "@/utils/blobTools";

import { prompt as mdPrompt } from 'mdui/functions/prompt.js';
import { useAuthStore } from "@/stores/auth";
import { setColorScheme } from "mdui";
import { useDomStore } from "@/stores/dom";
import JSZip from "jszip";

const authStore = useAuthStore()
const bnState = useBNStateStore()
const domStore = useDomStore()
const aboutDialog = inject('aboutDialog', ref<Dialog | null>(null))
const loginDialog = inject('loginDialog', ref<Dialog | null>(null))
const fileOpen = ref<HTMLInputElement | null>(null)
const zipOpen = ref<HTMLInputElement | null>(null)
const uiColor = ref('#2D0078')

const token = localStorage.getItem('token')
const userId = localStorage.getItem('userId')

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

const openZipWindow = () => {
  if (!zipOpen.value) {
    return
  };
  zipOpen.value.click()
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

const openZip = async () => {
  if (!zipOpen.value || !zipOpen.value.files) {
    return
  }
  const file = zipOpen.value.files[0]
  if (!file) {
    return
  }
  const zip = new JSZip()
  const zipData = await zip.loadAsync(file)

  // 处理文件路径
  if (!zipData.files['index.userimg']) return;
  const userimg = await zipData.files['index.userimg'].async('string');
  const userimgObject = JSON.parse(userimg)
  const userimgPureObject = userimgObject?.user_img_dict
  if (!userimgPureObject) return;
  const userimgPureBlobList: any = {}
  for (const [fileName, zipEntry] of Object.entries(zipData.files)) {
    // 只处理素材文件
    if (zipEntry.dir) continue;
    if (!(fileName.startsWith("material/")) && !(fileName.startsWith("record/"))) continue;
    const blob = await zipEntry.async('blob');
    const url = URL.createObjectURL(blob);
    userimgPureBlobList[fileName] = url
  }
  if (!zipData.files['index.bcm']) return;
  const work = await zipData.files['index.bcm'].async('string');
  const workObject = JSON.parse(work)
  for (const [styleId] of Object.entries(workObject?.styles?.styles_dict || {})) {
    workObject.styles.styles_dict[styleId].path = userimgPureBlobList[workObject.styles.styles_dict[styleId].path]
  }
  console.log(workObject.styles.styles_dict)
  await bnState.goWork(JSON.parse(JSON.stringify(workObject)), true)
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

const notLogin = async () => {
  authStore.notLogin = !authStore.notLogin
  await bnState.goWork(bnState.bcmJson, true)
}

watch(
  () => bnState.isPad,
  () => {
    bnState.goWork(bnState.bcmJson, true)
  }
);

watch(
  uiColor,
  (newVal) => {
    setColorScheme(newVal)
    const iframeWindow: any = domStore.iframeRef?.contentWindow
    if (iframeWindow && iframeWindow.mdui && iframeWindow.mdui.setColorScheme) {
      iframeWindow.mdui.setColorScheme(newVal)
    }
  }
)

onMounted(() => {
  uiColor.value = '#2D0078'
})
</script>
<template>
  <div class="top-app-bar-menu">
    <mdui-dropdown>
      <mdui-button variant="outlined" slot="trigger" class="pc-menu-button">文件</mdui-button>
      <mdui-menu>
        <mdui-menu-item @click="bnState.newWork(true)">新建作品</mdui-menu-item>
        <mdui-menu-item>打开作品</mdui-menu-item>
        <mdui-divider></mdui-divider>
        <mdui-menu-item @click="openFileWindow()">打开 .json 作品</mdui-menu-item>
        <mdui-menu-item @click="openZipWindow()">打开 .bcmbn 作品</mdui-menu-item>
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
        <mdui-menu-item @click="notLogin()">{{ authStore.notLogin ? '禁用' : '启用'
          }}离线模式</mdui-menu-item>
        <mdui-menu-item @click="loginDialog!.open = true" v-if="!token || !userId">登录</mdui-menu-item>
        <mdui-menu-item v-else>
          用户信息
          <mdui-menu-item slot="submenu">昵称: {{ authStore.userData.userInfo.user.nickname }}</mdui-menu-item>
          <mdui-menu-item slot="submenu">性别: {{ authStore.userData.userInfo.user.sex == 1 ? '男' : '女'
          }}</mdui-menu-item>
          <mdui-menu-item slot="submenu">UID: {{ authStore.userData.userInfo.user.id }}</mdui-menu-item>
        </mdui-menu-item>
      </mdui-menu>
    </mdui-dropdown>
    <mdui-dropdown>
      <mdui-button variant="outlined" slot="trigger" class="pc-menu-button" stay-open-on-click>编辑器</mdui-button>
      <mdui-menu>
        <mdui-menu-item>调整颜色<mdui-menu-item slot="submenu"><input type="color" class="change-color-input"
              ref="changeColorInput" v-model="uiColor"></mdui-menu-item></mdui-menu-item>
      </mdui-menu>
    </mdui-dropdown>
    <mdui-dropdown>
      <mdui-button variant="outlined" slot="trigger" class="pc-menu-button">帮助</mdui-button>
      <mdui-menu>
        <mdui-menu-item @click="openAbout()">Q&A</mdui-menu-item>
      </mdui-menu>
    </mdui-dropdown>
  </div>
  <input type="file" class="file-open" ref="fileOpen" accept=".json" title="打开 .json 作品" @change="openFile()" />
  <input type="file" class="file-open" ref="zipOpen" accept=".bcmbn" title="打开 .bcmbn 作品" @change="openZip()" />
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

.change-color-input {}
</style>
