// app.ts
App<IAppOption>({
  globalData: {
    userInfo: undefined,
    projects: [],
    token: 'sdasdas'
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.login();
  },

  login() {
    // 登录
    wx.login({
      success: res => {
        console.log(res.code, 'login code')
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

        this.getUserInfo();
      },
      fail:(res) => {
        console.log(res, 'fail');

      }
    })
  },

  getUserInfo() {
    wx.getUserInfo({
      success:(res) => {
        console.log(res, 'userInfo res');
        this.globalData.userInfo = res.userInfo;
      }
    })
  }
})