type BaseRequestOptions = Omit<Parameters<typeof wx.request>[0], 'data' | 'success'>
interface Options<T, R> extends BaseRequestOptions {
  url: string;
  data?: T;
  success?(res: R): void;
}

const ENV_MAP = {
  prod: 'http://www.flyingideal.com:30000/aapay',
  test: 'http://www.flyingideal.com:30000/aapay',
  dev: 'http://192.168.31.39:30000/aapay'
}

const host = ENV_MAP['dev'];

const aapayRequest =
  <T, R = unknown>(options: Options<T, BaseResponse<R>>): Promise<BaseResponse<R>> => {
    const app = getApp<IAppOption>();
    const { url: uri, success, fail, header = {}, ...restOptions } = options;
    const url = `${host}${uri}`;
    
    // 从 globalData 或本地存储获取 token
    let token = app.globalData.token;
    if (!token) {
      token = wx.getStorageSync('aapayToken');
      if (token) {
        app.globalData.token = token;
      }
    }
    
    if (token) {
      header['Authorization'] = `${token}`;
    }
    
    return new Promise((rs, rj) => {
      wx.request<BaseResponse<R>>({
        url,
        header,
        success(resp) {
          const { statusCode, data } = resp;
          if (statusCode >= 200 && statusCode < 300) {
            rs(data);
            success?.(data);
          } else if (statusCode === 401) {
            // token 失效，清除本地存储的 token
            wx.removeStorageSync('aapayToken');
            app.globalData.token = '';
            // 重新登录
            app.login().then(() => {
              // 重试当前请求
              aapayRequest(options).then(rs).catch(rj);
            }).catch(rj);
          } else {
            const errInfo = {
              errMsg: '服务端系统错误',
              errno: 1000
            }
            rj(errInfo.errMsg);
            fail?.(errInfo);
          }
        },
        fail(err) {
          rj(err);
          fail?.(err);
        },
        ...restOptions
      })
    })
  }

export const http = aapayRequest;
export default aapayRequest;