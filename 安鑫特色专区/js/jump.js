function callMiniProgram(params, callback) {
  let myparams = {
    miniId: params.miniId ? params.miniId : "gh_1ff75fb56f30",
    miniPath: params.pagesUrl,
    miniVersion: "0", //0正式版 1安卓体验版 ios测试版  2安卓测试版 ios体验版
  };
  openCallMiniProgram(myparams, callback);
}

function openCallMiniProgram(params, calllback) {
  let requestObj = {
    action: "callMiniProgram",
    params,
  };
  window.openCallMiniProgramCB = calllback;
  window.CCBBridge &&
    window.CCBBridge.requestNative(
      JSON.stringify(requestObj),
      "openCallMiniProgramCB",
    );
}

function jumpToMiniPromInterlayer(appId, pages) {
  console.log("dfdf");
  wx.miniProgram.navigateTo({
    url:
      `/pagesC/jumpMiniBtn/jumpMiniBtn?id=${appId}&url=` +
      encodeURIComponent(pages),
    // url: `/pages/jumpMiniBtn/jumpMiniBtn?id=${appId}&url=` + encodeURIComponent(pages),
  });
}

function isInWechat() {
  return /MicroMessenger/.test(navigator.userAgent);
}

function isInMiniprogram() {
  return navigator.userAgent && navigator.userAgent.indexOf("miniProgram") > -1;
}

function isInClient() {
  return (
    typeof window.CCBBridge !== "undefined" && window.CCBBridge.requestNative
  );
}
