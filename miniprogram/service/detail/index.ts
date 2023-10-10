import http from '@/utils/http/index';

export const queryProjectDetails = async (id: number) => {
  try {
    if (!id) throw 'not id';
    wx.showLoading({
      title: '查询中~',
      mask: true
    });
    const { code, data, message } = await http<null, QueryProjectDetailsData>({
      url: `/detail/p/${id}`,
      method: 'GET',
    });
    if (code === 0) return data;
    throw new Error(message || 'error')
  } catch (err) {
    console.error(err, 'getUserProjects error');
    return Promise.reject(err);
  } finally {
    wx.hideLoading();
  }
}

export const submitAddDetail = async (req: SubmitAddDetailReq) => {
  try {
    wx.showLoading({
      title: '提交中~',
      mask: true
    });
    const { code, data, message } = await http<SubmitAddDetailReq, SubmitAddDetailData>({
      url: '/detail/submit',
      method: 'POST',
      data: req
    });
    if (code === 0) return data;
    throw new Error(message || 'error')
  } catch (err) {
    console.error(err, 'getUserProjects error');
    return Promise.reject(err);
  } finally {
    wx.hideLoading();
  }
}