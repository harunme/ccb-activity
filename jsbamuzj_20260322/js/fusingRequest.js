console.log("lqb:aa",window.isDev)
let baseUrl = window.isDev ? 'http://testccblife.ccb.com:8880/uat_new/clp_coupon/txCtrl?txcode=' : 'https://yunbusiness.ccb.com/clp_coupon/txCtrl?txcode='

function requestFusingFun() {
    //分割出字符串
    let actId = ''
    let str = window.location.href;
    let urlStrArray = str.split("/quickTopicsPage/")
    console.log('lqb:aa',urlStrArray[1])
    if( !!urlStrArray[1] ) {
        let str1 =  urlStrArray[1] 
        let urlStrArray1 = str1.split("/")
        if(!!urlStrArray1[3]) {
            actId = urlStrArray1[3]
        }
    }
    console.log("lqb:actId",actId)

    if( actId ) {
        let params = {
            ACT_ID: actId,
            ACT_TYPE_LIST: ['20']
        }
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "post",
                url: baseUrl + 'A3341A240',
                dataType: "json",
                data: JSON.stringify(params),
                headers: {
                    "Accept": "application/json,text/javascript,*/*",
                    "Content-Type": "application/json;charset=utf-8",
                },
                success: function (res) {
                    console.log("sendRequest " + 'A3341A240', res);
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
}
