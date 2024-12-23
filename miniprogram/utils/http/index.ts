

type BaseRequestOptions = Omit<Parameters<typeof wx.request>[0], 'data' | 'success'>
interface Options<T, R> extends BaseRequestOptions {
  url: string;
  data?: T;
  success?(res: R): void;
}

const ENV_MAP = {
  prod: 'http://192.168.31.166:8088/aapay',
  test: 'http://192.168.31.166:8088/aapay',
  dev: 'http://192.168.31.166:8088/aapay'
}

const host = ENV_MAP['dev'];

const aapayRequest =
  <T, R = unknown>(options: Options<T, BaseResponse<R>>): Promise<BaseResponse<R>> => {
    const app = getApp<IAppOption>();
    const { url: uri, success, fail, header, ...restOptions } = options;
    const url = `${host}${uri}`;
    
    return new Promise((rs, rj) => {
      wx.request<BaseResponse<R>>({
        url,
        header: {
          'Authorization': url.includes('/auth/') ? undefined : `Bearer ${app.globalData.token}`,
          ...header
        },
        success(resp) {
          const { statusCode, data } = resp;
          if (statusCode >= 200 && statusCode < 300) {
            rs(data);
            success?.(data);
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