// pages/detail/detail.ts
import { queryProjectDetails } from '../../service/detail/index';

interface DetailDataType {
  // 项目的明细列表
  projectdetails: ProjectDetail[];
  // 按日期分组的项目明细列表（前端根据 projectdetails 自行分组）
  dataGroupedProjectDetailsArray: [string, ProjectDetail[]][];
}

interface DetailCustom {
  currentProjectId?: number;
  toAddOrEditDetail(e: WechatMiniprogram.CustomEvent): void;
  queryProjectDetails(projectId: number): Promise<void>;
  groupProjectDetailsByPayDate(projectDetails: ProjectDetail[]): Map<string, ProjectDetail[]>;
}

Page<DetailDataType, DetailCustom>({

  /**
   * 页面的初始数据
   */
  data: {
    projectdetails: [],
    dataGroupedProjectDetailsArray: [],
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
    const projectDetails = await queryProjectDetails(projectId);
    const dateGroupedProjectDetails = this.groupProjectDetailsByPayDate(projectDetails);
    const dataGroupedProjectDetailsArray = Array.from(dateGroupedProjectDetails.entries());
    this.setData({
      projectdetails: projectDetails,
      dataGroupedProjectDetailsArray: dataGroupedProjectDetailsArray,
    });
  },

  groupProjectDetailsByPayDate(projectDetails: ProjectDetail[]): Map<string, ProjectDetail[]> {
    // 创建一个 Map，键为 string，值为 ProjectDetail[]
    const groupedMap: Map<string, ProjectDetail[]> = new Map();

    // 遍历 projectDetails 数组
    for (const detail of projectDetails) {
      const { payTime } = detail;
      if (!payTime) {
        continue;
      }
      const parts = payTime.split('T')
      if (parts.length < 2) {
        console.error("日期不包含T，无法按照日期进行分组")
        continue;
      }
      const dateKey = parts[0];
      // 如果 Map 中还没有该 dateKey 的分组，则初始化一个空数组
      if (!groupedMap.has(dateKey)) {
        groupedMap.set(dateKey, []);
      }

      // 将当前 ProjectDetail 添加到对应的分组中
      groupedMap.get(dateKey)!.push(detail);
    }

    // 返回分组后的 Map
    return groupedMap;
  }
})