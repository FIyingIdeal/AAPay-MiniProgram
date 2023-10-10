import http from '@/utils/http/index';

export const getUserProjects = async () => {
  try {
    const { code, data, message } = await http<null, GetUserProjectsData>({
      url: '/project/list?userid=1',
      method: 'GET',
    });
    if (code === 0) return data;
    throw new Error(message || 'error')
  } catch (err) {
    console.error(err, 'getUserProjects error');
    return Promise.reject(err);
  }
}