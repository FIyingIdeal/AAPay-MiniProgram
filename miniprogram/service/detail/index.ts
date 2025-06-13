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

export const queryProjectDetailsGroupByDate = async (id: number) => {
  try {
    if (!id) throw 'not id';
    wx.showLoading({
      title: '查询中~',
      mask: true
    });
    const { code, data, message } = await http<null, QueryProjectDetailsGroupByDate>({
      url: `/detail/pg/${id}`,
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

export const submitAddDetail = async (req: SubmitAddDetailReq, update = false) => {
  try {
    wx.showLoading({
      title: '提交中~',
      mask: true
    });
    const { code, data, message } = await http<SubmitAddDetailReq, SubmitAddDetailData>({
      url: update ? '/detail/update' : '/detail/submit',
      method: 'POST',
      data: req
    });
    if (code === 0) return data;
    throw new Error(message || 'error')
  } catch (err) {
    wx.hideLoading();
    wx.showToast({ icon: 'error', title: typeof err === 'string' ? err : JSON.stringify(err) });
    console.error(err, 'getUserProjects error');
    return Promise.reject(err);
  } finally {
    wx.hideLoading();
  }
}