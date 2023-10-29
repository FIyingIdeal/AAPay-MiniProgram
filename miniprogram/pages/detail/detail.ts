// pages/detail/detail.ts
import { queryProjectDetails } from '@/service/detail/index';

type PageParams = {
  projectId: string;
}

interface DetailDataType {
  projectdetails: ProjectDetail[];
}

interface DetailCustom {
  toAddDetail(): void;
  queryProjectDetails(projectId: number): Promise<void>
}

Page<DetailDataType, DetailCustom>({

  /**
   * 页面的初始数据
   */
  data: {
    projectdetails: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(params: PageParams) {
    this.queryProjectDetails(Number(params.projectId));
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
  },

  toAddDetail() {
    wx.navigateTo({
      url: '/pages/detail/addDetail/addDetail'
    });
  },

  async queryProjectDetails(projectId) {
    const data = await queryProjectDetails(projectId);
    this.setData({ projectdetails: data })
  }
})