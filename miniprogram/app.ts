import { userLogin } from "@/service/user/index";

// app.ts
App<IAppOption>({
  globalData: {
    init: false,
    userInfo: undefined,
    projects: [],
    token: ''
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  async login() {
    return new Promise(async (resolve, reject) => {
      try {
        if (await this.checkSession() && this.globalData.token) {
          return resolve();
        }
        throw new Error();
      } catch {
        wx.login({
          success: async ({ code }) => {
            await this.userLogin(code);
            resolve();
          },
          fail: (res) => {
            console.error(res, 'wx.login fail');
            reject();
          }
        })
      }
    });
  },

  async userLogin(code: string) {
    try {
      wx.showLoading({
        title: '登录中~',
        mask: true
      });
      const { nickName, avatarUrl } = await this.getUserInfo();
      const { token } = await userLogin({
        code,
        nickName,
        avatarUrl
      });
      this.globalData.token = token;
      this.globalData.init = true;
      wx.hideLoading();
    } catch (err) {
      wx.hideLoading();
      wx.showToast({ title: 'userLogin fail', icon: 'none' })
      return Promise.reject();
    }
  },

  async getUserInfo() {
    return new Promise((resolve, reject) => {
      wx.getUserInfo({
        success: (res) => {
          console.log(res, 'userInfo res');
          this.globalData.userInfo = res.userInfo;
          resolve(res.userInfo);
        },
        fail(res) {
          console.error(res, 'wx.getUserInfo fail');
          reject(res.errMsg);
        }
      })
    })
  },

  async checkSession() {
    return new Promise((resolve, reject) => {
      wx.checkSession({
        success: resolve,
        fail: reject
      })
    })
  },
})
