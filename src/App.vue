<script setup lang="ts">
import { ref, provide, watchEffect, onMounted } from "vue";
import type { Dialog } from 'mdui/components/dialog.js';
import { useBNStateStore } from "@/stores/bnState";

import AppBarMenu from "./components/AppBarMenu.vue";
import { useAuthStore } from "./stores/auth";
//import { useBNStateStore } from "@/stores/bnState";
//const bnState = useBNStateStore()

import { snackbar as mdSnackbar } from 'mdui/functions/snackbar.js';

const vipUserList = ['12553235', '6902335']
const bnState = useBNStateStore()
const authStore = useAuthStore()
const aboutDialog = ref<Dialog | null>(null)
const loginDialog = ref<Dialog | null>(null)
const showOperate = ref(window.localStorage.getItem('showOperate') == 'true')
const isChangeWorkName = ref(false)

const closeAbout = () => {
  if (!aboutDialog.value) {
    return
  };
  aboutDialog.value.open = false;
}

watchEffect(() => {
  window.localStorage.setItem("showOperate", String(showOperate.value))
})

document.title = `BetterNemo-Online : ${bnState.bcmJson.project_name}`

const loginCodemao = async (e: SubmitEvent) => {
  e.preventDefault();
  const form = e.target;
  if (!form) {
    return
  }
  const formValue = new FormData(form as HTMLFormElement);
  mdSnackbar({
    message: `登录中...`,
    closeable: true,
  })
  const login = await authStore.loginUser(String(formValue.get('identity')), String(formValue.get('password')))
  if (login.success && loginDialog.value) {
    authStore.changeShowLogin(false)
    const getUser = await authStore.getUserData()
    if (getUser.success && vipUserList.includes(String(authStore.userData.userInfo.user.id))) {
      mdSnackbar({
        message: `${authStore.userData.userInfo.user.nickname},Welcome To BetterNemo-Online`,
        closeable: true,
      })
    }
  } else if (!login.success && loginDialog.value) {
    mdSnackbar({
      message: `登录失败: ${login.error ?? '未知原因'}`,
      closeable: true,
    })
  }
}

onMounted(() => {
  if (!loginDialog.value) {
    return
  }
  if (!localStorage.getItem('token') || !localStorage.getItem('userId')) {
    authStore.changeShowLogin(true)
  }
})

watchEffect(() => {
  if (!loginDialog.value) {
    return
  }
  loginDialog.value.open = authStore.showLogin
})

provide('aboutDialog', aboutDialog)
provide('loginDialog', loginDialog)
</script>

<template>
  <mdui-card class="loading-mask" v-if="bnState.isLoading"><mdui-circular-progress
      :value="bnState.workLoadingProgress / 100"></mdui-circular-progress></mdui-card>
  <mdui-layout>
    <mdui-top-app-bar class="top-app-bar" scroll-behavior="elevate" scroll-threshold="0">
      <mdui-button-icon icon="web"></mdui-button-icon>
      <mdui-top-app-bar-title>
        <div class="top-app-bar-title">
          <span>BetterNemo-Online :</span>
          <span v-if="!isChangeWorkName" @click="isChangeWorkName = true">{{ bnState?.bcmJson?.project_name }}</span>
          <mdui-text-field class="top-app-bar-work-name-field" v-else variant="outlined"
            @change="bnState.bcmJson.project_name = $event.target.value; isChangeWorkName = false" :value="bnState?.bcmJson?.project_name ??
              '默认作品名'"></mdui-text-field>
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
  <mdui-dialog class="login-dialog" ref="loginDialog" headline="登录Nemo小宇宙">
    <form @submit="loginCodemao" id="loginDialogForm">
      <mdui-text-field label="账号" name="identity" form="loginDialogForm" required></mdui-text-field>
      <mdui-text-field label="密码" toggle-password name="password" type="password" form="loginDialogForm"
        required></mdui-text-field>
    </form>
    <mdui-button slot="action" @click="authStore.changeShowLogin(false)" variant="text">取消</mdui-button>
    <mdui-button slot="action" type="submit" form="loginDialogForm">确定</mdui-button>
  </mdui-dialog>
</template>

<style scoped>
.loading-mask {
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
  border-radius: 0;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
}

.top-app-bar-title {
  display: flex;
  align-items: center;
  gap: 16px;
}

.top-app-bar-work-name-field {
  height: 40px;
  max-width: 300px;
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
