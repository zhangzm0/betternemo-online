import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useBNStateStore } from './bnState'

export const useAuthStore = defineStore('auth', () => {
  const bnState = useBNStateStore()
  const showLogin = ref(false)
  const isLogin = ref(false)
  const userData = ref({
    userInfo: {
      user: {
        id: 0,
        nickname: '测试用户',
        sex: 1,
        description: '测试用户',
        doing: '',
        preview_work_id: 0,
        level: 999,
        avatar: '',
      },
    },
  })
  async function getUserData() {
    try {
      const res = await fetch(
        `https://codemao.xingtaishijiaoxiqu.workers.dev/api/codemao/api/user/info/detail/${localStorage.getItem('userId') ?? ''}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      const data = await res.json()
      userData.value = data.data
      isLogin.value = true
      return { success: true }
    } catch (err) {
      console.error('失败:', err)
      return { success: false }
    }
  }
  async function loginUser(identity: string, password: string) {
    const formData = {
      identity: identity,
      pid: 'OqMVXvXp',
      password: password,
    }
    try {
      const res = await fetch(
        'https://codemao.xingtaishijiaoxiqu.workers.dev/api/codemao/tiger/v3/web/accounts/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      )

      const data = await res.json()
      localStorage.setItem('token', data.auth.token)
      localStorage.setItem('userId', data.user_info.id)
      console.log('成功:', data)
      bnState.goWork(bnState.bcmJson)
      isLogin.value = true
      return { success: true }
    } catch (err) {
      console.error('失败:', err)
      return { success: false, error: err }
    }
  }
  function changeShowLogin(value: boolean) {
    showLogin.value = value
  }
  return { userData, getUserData, loginUser, showLogin, changeShowLogin }
})
