//app.js
App({
    onLaunch: function () {
        //调用API从本地缓存中获取数据
        var default_list = wx.getStorageSync('default_list')
        if (!default_list) {
            wx.setStorageSync('default_list',[
                {
                    country: 'CNY',
                    charge: 0.00,
                    name: '人民币'
                },
                {
                    country: 'USD',
                    charge: 0.00,
                    name: '美元'
                },
                {
                    country: 'HKD',
                    charge: 0.00,
                    name: '港币'

                },
                {
                    country: 'EUR',
                    charge: 0.00,
                    name: '欧元'
                }
            ])
        }
    },
    getUserInfo:function(cb){
        var that = this
        if(this.globalData.userInfo){
            typeof cb == "function" && cb(this.globalData.userInfo)
        }else{
            //调用登录接口
            wx.login({
                success: function () {
                    wx.getUserInfo({
                        success: function (res) {
                            that.globalData.userInfo = res.userInfo
                            typeof cb == "function" && cb(that.globalData.userInfo)
                        }
                    })
                }
            })
        }
    },
    globalData:{
        userInfo:null
    }    
})
