type BaseRequestOptions = Omit<Parameters<typeof wx.request>[0], 'data'>
interface Options<T> extends BaseRequestOptions {
  url: string;
  data?: T;
}

const ENV_MAP = {
  prod: 'http://localhost:8080/aapay',
  test: 'http://localhost:8080/aapay',
  dev: 'http://localhost:8080/aapay'
}
const host = ENV_MAP['dev'];

const aapayReqest = <T>(options: Options<T>) => {
  const { url: uri, ...restOptions } = options;
  const url = `${host}${uri}`;
  wx.request({
    url,
    ...restOptions
  })
}

export default aapayReqest;