function requestFun(txcode, params) {
    console.log("txcode", txcode);
    console.log("params", params);
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "post",
            url: "https://yunbusiness.ccb.com/clp_service/txCtrl?txcode=" + txcode,
            dataType: "json",
            data: JSON.stringify(params),
            headers: {
                "Accept": "application/json,text/javascript,*/*",
                "Content-Type": "application/json;charset=utf-8",
            },
            success: function (res) {
                console.log("sendRequest " + txcode, res);
                if (res.errCode == "0") {
                    resolve(res.data);
                } else {
                    // layer.show(`${txcode}调用失败: ${res.errMsg}`, function() {});
                }
            },
            error: function (err) {
                // layer.show(`${txcode}调用失败: ${JSON.stringify(err.responseJSON)}`, function() {});
            }
        })
    })
}

async function openTagRequest(title,desc) {
    document.addEventListener('WeixinOpenTagsError', function (e) {
        console.error('WeixinOpenTagsError', e)
        // layer.show(e.detail.errMsg, function() {}); // 无法使用开放标签的错误原因，需回退兼容。仅无法使用开放标签，JS-SDK其他功能不受影响
    });
    // let access_token = await requestFun(
    //     "A3341WX01",
    //     {
    //         "grant_type": "client_credential",
    //         "appid": "wxd150bf0374dcb1c7",
    //         "secret": "0a28fb42e9063d0094a89d2232bed268",
    //     },
    // )
    // let configData = await requestFun(
    //     "A3341WX02",
    //     {
    //         access_token: access_token.access_token,
    //         url: location.href,
    //     }
    // )
    let configData = await requestFun(
        "A3341WX03",
        {
            "grant_type": "client_credential",
            "appid": "wxd150bf0374dcb1c7",
            url: location.href,
        }
    )
    wx.config({
        debug: false, // 开启调试模式,调用的所有 api 的返回值会在客户端 alert 出来，若要查看传入的参数，可以在 pc 端打开，参数信息会通过 log 打出，仅在 pc 端时才会打印
        appId: 'wxd150bf0374dcb1c7', // 必填，公众号的唯一标识
        timestamp: configData.timestamp, // 必填，生成签名的时间戳
        nonceStr: configData.nonceStr, // 必填，生成签名的随机串
        signature: configData.signature,// 必填，签名
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems', 'updateAppMessageShareData', 'updateTimelineShareData'], // 必填，需要使用的 JS 接口列表
        openTagList: ['wx-open-launch-app'] // 可选，需要使用的开放标签列表，例如['wx-open-launch-app']
    })
    // var btn = document.getElementById('launch-btn');
    // // btn.setAttribute("extinfo", app_open.split("?")[1]);
    // btn.addEventListener('launch', function (e) {
    //     console.log('success');
    // });
    // btn.addEventListener('error', function (e) {
    //     console.log('fail', e.detail);
    //     // if (isiOS) {
    //     //     location.href = ios_download;
    //     // }
    //     // if (isAndroid) {
    //     //     location.href = android_download;
    //     // }
    // });
    wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
        // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
        wx.updateAppMessageShareData({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'https://res.yunbusiness.ccb.com/gbchannel/e_report/CCBLIFE/img/logo.45ebd170.png', // 分享图标
            success: function () {
                // 设置成功
                console.log('link', location.href)
            },
            fail: function (err) {
                console.error('updateAppMessageShareData', err)
            }
        })
        // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
        wx.updateTimelineShareData({
            title: title, // 分享标题
            link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'https://res.yunbusiness.ccb.com/gbchannel/e_report/CCBLIFE/img/logo.45ebd170.png', // 分享图标
            success: function () {
                // 设置成功
            }
        })
        // wx.hideMenuItems({
        //     menuList: ['menuItem:copyUrl'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        // });
    });

    wx.error(function (res) {
        console.error('wx.error', res)
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    });

}