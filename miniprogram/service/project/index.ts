import http from '@/utils/http/index';

export const getUserProjects = async (userId: number) => {
  try {
    const { code, data, message } = await http<null, GetUserProjectsData>({
      url: `/project/list?userid=${userId}`,
      method: 'GET',
    });
    if (code === 0) return data;
    throw new Error(message || 'error')
  } catch (err) {
    console.error(err, 'getUserProjects error');
    return Promise.reject(err);
  }
}

export const queryProjectUsers = async (projectId: number) => {
  if (!projectId) throw 'projectId cannot be null'
  try {
    const { code, data, message } = await http<null, GetProjectUsersData>({
      url: `/project/users?projectId=${projectId}`,
      method: 'GET',
    });
    if (code === 0) return data;
    throw new Error(message || 'error')
  } catch (err) {
    console.error("queryProjectUsers error", err);
    return Promise.reject(err);
  }
}

export const submitAddProject = async (payload: SubmitAddProjectReq) => {
  try {
    const { code, data, message } = await http<SubmitAddProjectReq, number>({
      url: `/project/create`,
      method: 'POST',
      data: payload
    });
    if (code === 0) return data;
    throw new Error(message || '创建项目失败')
  } catch (err: unknown) {
    wx.showToast({ icon: 'error', title: err instanceof Error ? err.message : JSON.stringify(err) });
    console.error("sbumitAddProject error", err);
    return Promise.reject(err);
  }
}