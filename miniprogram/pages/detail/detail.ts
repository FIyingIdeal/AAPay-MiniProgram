// pages/detail/detail.ts
import { queryProjectDetails } from '@/service/detail/index';

interface DetailDataType {
  projectdetails: ProjectDetail[];
}

interface DetailCustom {
  currentProjectId?: number;
  toAddOrEditDetail(e: WechatMiniprogram.CustomEvent): void;
  queryProjectDetails(projectId: number): Promise<void>
}

Page<DetailDataType, DetailCustom>({

  /**
   * 页面的初始数据
   */
  data: {
    projectdetails: []
  },
  currentProjectId: undefined,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(query) {
    const currentProjectId = Number(query.projectId) || 0;
    this.currentProjectId = currentProjectId;
  },
  onShow() {
    const { currentProjectId } = this;
    if (currentProjectId) {
      this.queryProjectDetails(currentProjectId);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
  },

  toAddOrEditDetail(e) {
    const { id } = e.currentTarget.dataset;
    const { currentProjectId } = this;
    const { projectdetails } = this.data;
    const item = (id ? projectdetails.find(it => it.id == id) ?? {} : {}) as ProjectDetail;
    // TODO: 先在前端处理时间字段的特殊兼容逻辑
    const flagIdx = item.payTime?.search('T');
    const formatItem: ProjectDetail = { ...item, payTime: item.payTime?.slice(0, flagIdx > -1 ? flagIdx : undefined) };
    wx.navigateTo({
      url: `/pages/detail/addDetail/addDetail?projectId=${currentProjectId}&item=${encodeURIComponent(JSON.stringify(formatItem))}`,
    });
  },

  async queryProjectDetails(projectId) {
    const data = await queryProjectDetails(projectId);
    this.setData({ projectdetails: data })
  }
})