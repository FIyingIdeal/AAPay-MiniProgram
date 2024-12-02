import http from '@/utils/http/index';

export const userLogin = async (req: UserLoginReq) => {
  try {
    if (!req.code) throw new Error('not wx.login code');
    const { code, data, message } = await http<UserLoginReq, UserLoginResp>({
      url: `/auth/wx/login`,
      method: 'POST',
      data: req
    });
    if (code === 0) return data;
    throw new Error(message || 'error')
  } catch (err) {
    console.error(err, 'getUserProjects error');
    return Promise.reject(err);
  }
}
