/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    token: string;
    userInfo?: WechatMiniprogram.UserInfo,
    projects: UserProject[];
  }
  login(): void,
  getUserInfo(): void,
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}

interface BaseResponse<T> {
  code: number;
  message: string;
  data: T;
}