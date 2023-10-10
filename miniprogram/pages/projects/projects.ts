import { getUserProjects } from '@/service/project/index';

interface DataType {
  project: UserProject;
  projects: UserProject[];
}
interface Custom {
  getUserProjects(): Promise<void>;
  toProjectDetails(): void
}
Page<DataType, Custom>({

  /**
   * 页面的初始数据
   */
  data: {
    project: {
      id: 0,
      name: '',
      type: '',
      users: []
    },
    projects: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.getUserProjects();
  },

  async getUserProjects() {
    const data = await getUserProjects();
    this.setData({ projects: data });
  },

  toProjectDetails() {
    wx.navigateTo({
      url: '/pages/detail/detail'
    })
  }
})