import { getUserProjects } from '@/service/project/index';

const app = getApp<IAppOption>();

interface DataType {
  project: UserProject;
  projects: UserProject[];
}
interface Custom {
  getUserProjects(): Promise<void>;
  toProjectDetails(e: WechatMiniprogram.BaseEvent<{}, { id: number }>): void;
  toAddProject(): void;
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

  async onShow() {
    await app.login();
    this.getUserProjects();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
  },

  async getUserProjects() {
    const data = await getUserProjects(1);
    this.setData({ projects: data });
  },

  toProjectDetails(e) {
    wx.navigateTo({
      url: `/pages/detail/detail?projectId=${e.currentTarget.dataset.id}`
    })
  },

  toAddProject() {
    wx.navigateTo({
      url: '/pages/projects/addProject/addProject'
    });
  },
})