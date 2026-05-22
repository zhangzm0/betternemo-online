<script setup lang="ts">
import { ref, inject, watch, onMounted } from "vue";
import type { Dialog } from 'mdui/components/dialog.js';

import { useBNStateStore } from "@/stores/bnState";
import { downloadBlob, downloadString } from "@/utils/blobTools";

import { prompt as mdPrompt } from 'mdui/functions/prompt.js';
import { useAuthStore } from "@/stores/auth";
import { Select, setColorScheme } from "mdui";
import { useDomStore } from "@/stores/dom";
import JSZip from "jszip";
import { alert as mdAlert } from 'mdui/functions/alert.js';

const authStore = useAuthStore()
const bnState = useBNStateStore()
const domStore = useDomStore()
const aboutDialog = inject('aboutDialog', ref<Dialog | null>(null))
const loginDialog = inject('loginDialog', ref<Dialog | null>(null))
const workExtensionsDialog = ref<Dialog | null>(null)
const fileOpen = ref<HTMLInputElement | null>(null)
const zipOpen = ref<HTMLInputElement | null>(null)
const uiColor = ref('#2D0078')
const needLoadExtensions = ref<{ name: string, workVersion: string, version: (string | null), url: string, goInstall: boolean }[]>([])

const token = localStorage.getItem('token')
const userId = localStorage.getItem('userId')

const userimgPureBlobList: Record<string, any> = {}

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
      bnState.isZipWork = false
    };
    if (!file) {
      return
    }
    reader.readAsText(file);
    fileOpen.value.value = ''
  } catch (e) {
    console.error(e)
  }
}

const openZip = async () => {
  try {
    if (!zipOpen.value || !zipOpen.value.files || !workExtensionsDialog.value) {
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
    for (const [fileName, zipEntry] of Object.entries(zipData.files)) {
      // 只处理素材文件
      if (zipEntry.dir) continue;
      if (!(fileName.startsWith("material/")) && !(fileName.startsWith("record/"))) continue;
      // 生成Blob
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
    // 作品扩展筛选
    if (zipData.files['extensions.json']) {
      const extensions = await zipData.files['extensions.json'].async('string')
      const extensionsObject = JSON.parse(extensions)
      bnState.workExtensions = extensionsObject?.extensions ?? []
    };
    // 这里应该写筛选逻辑,我懒了
    for (const extension of bnState.workExtensions) {
      needLoadExtensions.value.push({
        name: extension?.name,
        workVersion: extension?.version,
        version: null,
        url: extension?.url,
        goInstall: false
      })
    }
    workExtensionsDialog.value.open = true
    bnState.bcmJson = JSON.parse(JSON.stringify(workObject))
    zipOpen.value.value = '';
    (bnState.bcmJson.extensions as any) = bnState.workExtensions
  }
  catch (e) {
    console.error(e)
  }
  // await bnState.goWork(JSON.parse(JSON.stringify(workObject)), true)
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


const changeExtensionInstall = (index: number, event: any) => {
  if (!needLoadExtensions.value[index]) return;
  const selectTarget: Select = event.target
  if (selectTarget.value == '') {
    selectTarget.value = 'no-event'
  } else if (selectTarget.value == 'download') {
    needLoadExtensions.value[index].goInstall = true
  } else {
    needLoadExtensions.value[index].goInstall = false
  }
}

const openZipWorkAndExtensions = async () => {
  if (!workExtensionsDialog.value) return;
  await bnState.goWork(JSON.parse(JSON.stringify(bnState.bcmJson)), true)
  console.log(needLoadExtensions.value)
  for (const extension of needLoadExtensions.value) {
    if (extension.goInstall && domStore.iframeRef?.contentWindow) {
      (domStore.iframeRef.contentWindow as unknown as any).loadURLExtension(extension.url)
    }
  }
  bnState.isZipWork = true
  workExtensionsDialog.value.open = false
}

const saveJsonFile = async () => {
  const zip = new JSZip();
  await bnState.syncWork()
  const bcmbnWorkJson = bnState.bcmJson
  const userImgDict = { "user_img_dict": {} }
  for (const [styleId] of Object.entries(bcmbnWorkJson?.styles?.styles_dict || {})) {
    // 获取相关内容
    const stylePath = (bcmbnWorkJson.styles.styles_dict as Record<string, any>)[styleId].path
    const blobListIndex = Object.values(userimgPureBlobList).indexOf(stylePath)
    if (blobListIndex == -1) continue;

    // 获取blob内容
    const res = await fetch(stylePath);
    const imageBlob = await res.blob();

    // 添加内容
    const path = Object.keys(userimgPureBlobList)[blobListIndex]
    zip.file(path ?? '', imageBlob);

    (userImgDict.user_img_dict as Record<string, any>)[styleId] = { id: styleId, path: path };
    // 还原
    (bcmbnWorkJson.styles.styles_dict as Record<string, any>)[styleId].path = path
  }
  // 新增作品内容
  zip.file("index.bcm", JSON.stringify(bnState.bcmJson));
  zip.file("extensions.json", JSON.stringify({ extensions: bnState.bcmJson.extensions }));

  // 新增目前不支持的占位符
  zip.file("index.cover", '');
  zip.file("index.meta", JSON.stringify(
    {}
  ));
  zip.file("index.userimg", JSON.stringify(userImgDict));
  const zipBlob = await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
  });
  downloadBlob(zipBlob, `${bnState.bcmJson.project_name}.bcmbn`)
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
        <mdui-menu-item @click="saveFile()" :disabled="bnState.isZipWork">下载 .json 作品</mdui-menu-item>
        <mdui-menu-item @click="saveJsonFile()" :disabled="!bnState.isZipWork">下载 .bcmbn 作品</mdui-menu-item>
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
  <Teleport to="#app">
    <mdui-dialog class="work-extensions-dialog" ref="workExtensionsDialog">
      <span slot="headline">扩展冲突</span>
      <div class="mdui-table">
        <table>
          <thead>
            <tr>
              <th>扩展名</th>
              <th>使用版本</th>
              <th>本地版本</th>
              <th>本地存在</th>
              <th>远程URL</th>
              <th>执行操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(extension, index) in needLoadExtensions" :key="extension.name">
              <th class="work-extensions-dialog-text">{{ extension.name }}</th>
              <th class="work-extensions-dialog-text">{{ extension.workVersion }}</th>
              <th class="work-extensions-dialog-text">{{ extension.version ?? '-' }}</th>
              <th class="work-extensions-dialog-text">{{ extension.version ? '是' : '否' }}</th>
              <th class="work-extensions-dialog-text">{{ extension.url }}</th>
              <th class="work-extensions-dialog-text">
                <mdui-select variant="outlined" value="no-event" @change="changeExtensionInstall(index, $event)">
                  <mdui-menu-item value="no-event" @click="extension.goInstall = false">使用本地版本/不加载扩展</mdui-menu-item>
                  <mdui-menu-item value="download" @click="extension.goInstall = true">下载扩展并加载</mdui-menu-item>
                </mdui-select>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      <mdui-button slot="action" @click="openZipWorkAndExtensions()">确定</mdui-button>
    </mdui-dialog>
  </Teleport>
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

.mdui-table {
  min-width: 800px;
  margin: 0;
}

.work-extensions-dialog::part(body) {
  overflow: visible;
}

.work-extensions-dialog::part(panel) {
  max-width: none;
}

.work-extensions-dialog-text {
  word-break: break-all;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  max-width: 800px;
}
</style>
