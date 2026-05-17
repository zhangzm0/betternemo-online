/// <reference path="../_TYPE.d.ts"/>

Extension.metaData = {
  name: "BNOnline",
  version: "1.0.0",
  description: "BNOnline辅助扩展",
  author: "BNOnline",
  docs: ""
};

(async (Extension) => {
  'use strict';
  const BN = Extension.API;
  const Block = BN.Block;
  const Toolbox = BN.Toolbox;
  await BN.waitBlocklyLoaded();

  BN.regColor("RUNTIME_CONFIG_HUE", "#2D0078", "#2D0078");


  let toolboxXML = [
    Toolbox.title("BNOnline"),
    Toolbox.button("device_info", " 设备信息 ", () => {
      const userAgent = navigator.userAgent;
      let webviewVersion = '未知';
      const webviewMatch = userAgent.match(/Version\/(\d+\.\d+)/);
      if (webviewMatch) webviewVersion = webviewMatch[1];
      else if (userAgent.includes('Chrome/')) {
        const chromeMatch = userAgent.match(/Chrome\/(\d+)/);
        if (chromeMatch) webviewVersion = chromeMatch[1];
      }

      const loaderVersion = window.BetterNemoVersion || '未知';
      const screenInfo = `${screen.width}x${screen.height}`;
      let os = '未知';
      if (userAgent.includes('Android')) os = 'Android';
      else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) os = 'iOS';
      else if (userAgent.includes('Windows')) os = 'Windows';
      else if (userAgent.includes('Mac')) os = 'macOS';
      else if (userAgent.includes('Linux')) os = 'Linux';

      const infoText = `加载器版本：${loaderVersion}(BetterNemo-Online)\nWebView 版本：${webviewVersion}\n操作系统：${os}\n屏幕尺寸：${screenInfo}\nUser Agent：${userAgent}`;
      alert(infoText);
      BN.log('ConfigPanel', '已显示设备信息');
    }, "procedure-add-param"),
    Toolbox.button("About", " 关于 ", () => {
      alert("BetterNemo-Online 辅助扩展")
    }, "procedure-add-param"),
    Toolbox.sep(20),
  ];

  toolboxXML.push(Toolbox.line("主题"));
  let config = storage.get('theme_config');
  for (const themeName of THEME_FILES) {
    toolboxXML.push(Toolbox.button(`UseTheme${themeName}`, ` 使用主题 ${themeName} `, async () => {
      Object.keys(config).forEach(key => {
        config[key] = (key == themeName);
      });
      storage.set('theme_config', config);
      reloadTheme();
      BN.log('ConfigPanel', '已设置主题' + themeName);
    }, "procedure-add-param"))
  };
  toolboxXML.push(Toolbox.flyout_bottom());

  BN.regIcon(`<symbol id="icon-bnonline" viewBox="-33 -33 90 90">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6l5.25 3.15L17 12.23l-4-2.37V7z"/>
    </symbol>`);
  BN.addToolbox("bnonline-config", "icon-bnonline", "#2D0078", toolboxXML);

})(Extension);
