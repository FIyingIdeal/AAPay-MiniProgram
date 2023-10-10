// pages/detail/detail.ts
import { queryProjectDetails } from '@/service/detail/index'
interface DetailDataType {
  projectdetails: ProjectDetail[];
}

interface DetailCustom {
  toAddDetail(): void;
  queryProjectDetails(): Promise<void>
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
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.queryProjectDetails();
  },

  toAddDetail() {
    wx.navigateTo({
      url: '/pages/detail/addDetail/addDetail'
    });
  },

  async queryProjectDetails() {
    const data = await queryProjectDetails(2);
    this.setData({ projectdetails: data })
  }
})