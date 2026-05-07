/**
 * 初始化Webview数据的Payload类型
 */
interface InitWebviewDataPayload {
  avatar_url: string
  bcm_version: string
  context_menu_with_set_block_visibility: boolean
  enable_hide: boolean
  is_login: boolean
  is_pad: boolean
  nickname: string
  sidebar_width: number
  stage_position: any
  toolbox_mode: string
  translucent_block_visible: string
  user_id: string
  user_level: number
  user_token: string
  webview_height: number
  work_id: string
}

/**
 * Bridge消息基础类型
 */
interface BridgeMessageBase {
  __bn_bridge__: true
  direction: 'native->webview' | 'host->webview-callback' | 'webview->host'
}

/**
 * Native->Webview的Bridge消息
 */
interface NativeToWebviewMessage extends BridgeMessageBase {
  direction: 'native->webview'
  api: string
  args: any[]
}

/**
 * Host->Webview回调的Bridge消息
 */
interface HostToWebviewCallbackMessage extends BridgeMessageBase {
  direction: 'host->webview-callback'
  callbackId: string | number
  result: string
}

/**
 * Webview->Host的Bridge消息
 */
interface WebviewToHostMessage extends BridgeMessageBase {
  direction: 'webview->host'
  callbackId?: string | number
  [key: string]: any // 兼容其他可能的字段
}

/**
 * 原生消息类型
 */
interface NativeMessage {
  type: string
  payload: Record<string, any> | boolean
}

type VueIframeRef = {
  value: HTMLIFrameElement | null
} | null

export class BNWorkspaceBridge {
  private iframeRef: VueIframeRef
  private messageListener: (event: MessageEvent) => void

  public onMessage?: (message: any) => void

  constructor(iframeRef: VueIframeRef) {
    this.iframeRef = iframeRef
    this.messageListener = this.handleMessage.bind(this)
    ;(window as any).BNWorkspaceBridge = this
  }

  private get targetWindow(): Window | null | undefined {
    return this.iframeRef?.value?.contentWindow
  }

  private postToWorkspace(message: NativeMessage | BridgeMessageBase): boolean {
    if (!this.targetWindow) return false
    this.targetWindow.postMessage(message, '*')
    return true
  }

  sendNativeMessage(type: string, payload: boolean | Record<string, any> = {}): boolean {
    return this.postToWorkspace({ type, payload })
  }

  sendBridgeMessage(api: string, args: any[] = []): boolean {
    const message: NativeToWebviewMessage = {
      __bn_bridge__: true,
      direction: 'native->webview',
      api,
      args,
    }
    return this.postToWorkspace(message)
  }

  resolveBridgeCallback(callbackId: string | number, result = ''): boolean {
    const message: HostToWebviewCallbackMessage = {
      __bn_bridge__: true,
      direction: 'host->webview-callback',
      callbackId,
      result,
    }
    return this.postToWorkspace(message)
  }

  private handleMessage(event: MessageEvent): void {
    if (!this.targetWindow || event.source !== this.targetWindow) return

    const data = event.data
    if (!data || typeof data !== 'object' || !data.__bn_bridge__) return

    const bridgeMessage = data as WebviewToHostMessage
    if (bridgeMessage.direction === 'webview->host') {
      console.log('[BN Bridge][from workspace]', bridgeMessage)

      if (bridgeMessage.callbackId) {
        this.resolveBridgeCallback(bridgeMessage.callbackId, '')
      }

      if (this.onMessage) {
        this.onMessage(bridgeMessage)
      }
    }
  }

  registerListener(): void {
    window.addEventListener('message', this.messageListener)
  }

  unregisterListener(): void {
    window.removeEventListener('message', this.messageListener)
    if ((window as any).BNWorkspaceBridge) {
      delete (window as any).BNWorkspaceBridge
    }
  }

  initWebviewData(): boolean {
    const initPayload: InitWebviewDataPayload = {
      avatar_url: 'https://img.cdn1.vip/i/69f9c7ab0388b_1777977259.webp',
      bcm_version: '0.16.2',
      context_menu_with_set_block_visibility: true,
      enable_hide: false,
      is_login: true,
      is_pad: true,
      nickname: '测试用户',
      sidebar_width: 64,
      stage_position: {
        portrait: {
          normal: {
            bottom: 0,
            height: 720,
            left: 0,
            ratio: '1/2',
            right: 0,
            top: 0,
            width: 450,
          },
        },
      },
      toolbox_mode: 'normal',
      translucent_block_visible: 'translucent',
      user_id: '【用户ID】',
      user_level: 9999,
      user_token: '【用户TOKEN】',
      webview_height: 0,
      work_id: '【作品ID】',
    }
    return this.sendNativeMessage('INIT_WEBVIEW_DATA', initPayload)
  }
}
