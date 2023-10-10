type BaseRequestOptions = Omit<Parameters<typeof wx.request>[0], 'data' | 'success'>
interface Options<T, R> extends BaseRequestOptions {
  url: string;
  data?: T;
  success?(res: R): void;
}

const ENV_MAP = {
  prod: 'http://localhost:8080/aapay',
  test: 'http://localhost:8080/aapay',
  dev: 'http://localhost:8080/aapay'
}
const host = ENV_MAP['dev'];

const aapayReqest =
  <T, R = unknown>(options: Options<T, BaseResponse<R>>): Promise<BaseResponse<R>> => {
    const { url: uri, success, fail, ...restOptions } = options;
    const url = `${host}${uri}`;
    return new Promise((rs, rj) => {
      wx.request<BaseResponse<R>>({
        url,
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
            rj(errInfo);
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

export const http = aapayReqest;
export default aapayReqest;