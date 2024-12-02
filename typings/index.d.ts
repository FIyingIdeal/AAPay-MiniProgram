/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    init: boolean;
    token: string;
    userInfo?: WechatMiniprogram.UserInfo,
    projects: UserProject[];
  }
  login(): Promise<void>,
  getUserInfo(): Promise<WechatMiniprogram.UserInfo>,
  checkSession(): Promise<unknown>,
  userLogin(code: string): Promise<void>,
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}

interface BaseResponse<T> {
  code: number;
  message: string;
  data: T;
}