import { submitAddDetail } from '@/service/detail/index';
import { queryProjectUsers } from '@/service/project/index';
import { projectDetailTypeOptions } from '@/constants/index';


interface DetailShow extends SubmitAddDetailReq {
  typeName: string;
  payNickname: string;
  settleStatusName: string;
}

interface DataType {
  detailTypeSelector: typeof projectDetailTypeOptions;
  settleStatusSelector: typeof projectDetailTypeOptions;
  detailShow: DetailShow;
  payUsersSelector: ProjectUserItem[];
}

interface Custom {
  currentProjectId?: number;
  handleNameInput(e: WechatMiniprogram.Input): void;
  handlePayTimeChange(e: any): void
  handlePayUserIdChange(e: any): void
  handleDetailTypeChange(e: any): void;
  handleSettleStatusChange(e: any): void;
  getEditInfo(detailInfo: ProjectDetail, usersData: ProjectUserItem[]): Partial<DetailShow>;
  submitAddDetail(): Promise<void>;
  handleReset(): Promise<void>;
  init(query: {
    item?: string;
    projectId?: string;
  }): Promise<void>;
}

const initDetailShow: SubmitAddDetailReq = {
  id: 0,
  projectId: 0,
  name: '',
  remark: '',
  type: 0,
  amount: 0,
  apportionType: 1,
  payUserId: 1,
  payTime: '',
  settleStatus: 0,
}

const initSettleStatusSelector = [
  {
    id: 0,
    name: "待结算"
  },
  {
    id: 1,
    name: "结算中"
  },
  {
    id: 2,
    name: "已计算"
  },
  {
    id: 3,
    name: "不结算"
  }
]

Page<DataType, Custom>({
  /**
   * 页面的初始数据
   */
  data: {
    // 项目类型下拉选项
    detailTypeSelector: projectDetailTypeOptions,
    // 结算状态下拉选项
    settleStatusSelector: initSettleStatusSelector,
    // 支付人下拉
    payUsersSelector: [],
    // 明细提交信息
    detailShow: {
      ...initDetailShow,
      typeName: '',
      payNickname: '',
      settleStatusName: "待结算"
    },
  },
  currentProjectId: undefined,

  onLoad(query) {
    this.init(query)
  },

  async init(query) {
    try {
      wx.showLoading({ title: '加载中...' });
      const { item, projectId } = query;
      const detailInfo: ProjectDetail = JSON.parse(decodeURIComponent(item ?? ''));
      const currentProjectId = Number(projectId) || 0;
      this.currentProjectId = currentProjectId;
      const usersData = await queryProjectUsers(currentProjectId);

      const { detailShow } = this.data;
      const editDetailShow = this.getEditInfo(detailInfo, usersData);
      this.setData({
        payUsersSelector: usersData,
        detailShow: {
          ...detailShow,
          ...editDetailShow,
          projectId: currentProjectId
        }
      });
    } catch (e) {
      console.error(e);
      wx.showToast({ title: '请重试！' });
      wx.navigateBack();
    } finally {
      wx.hideLoading();
    }
  },

  async handleReset() {
    const { currentProjectId } = this;
    console.log('123123', currentProjectId);

    this.setData({
      detailShow: {
        ...initDetailShow,
        projectId: currentProjectId!,
        typeName: '',
        payNickname: '',
        settleStatusName: "待结算"
      }
    })
  },

  async submitAddDetail() {
    const { detailShow } = this.data;
    const { typeName, payNickname, settleStatusName, ...params } = detailShow;
    const { payTime } = params;
    const req: SubmitAddDetailReq = {
      ...params,
      payTime: `${payTime}T08:00:00`,
    };
    await submitAddDetail(req, Boolean(req.id));
    wx.navigateBack();
  },

  getEditInfo(detailInfo: ProjectDetail, usersData: ProjectUserItem[]) {
    const { detailTypeSelector, settleStatusSelector } = this.data;
    const { type, payUserId, settleStatus } = detailInfo;
    const editDetailShow: Partial<DetailShow> = {
      ...detailInfo,
    };
    if (type) {
      editDetailShow.typeName = detailTypeSelector.find(({ id }) => id === type)?.name ?? '';
    }
    if (payUserId) {
      editDetailShow.payNickname = usersData.find(({ userId }) => userId === payUserId)?.nickname ?? '';
    }
    if (settleStatus) {
      editDetailShow.settleStatusName = settleStatusSelector.find(({ id }) => id === settleStatus)?.name ?? '';
    }
    return editDetailShow;
  },

  handleNameInput(e) {
    const { detailShow } = this.data;
    const name = e.target.dataset.name
    const value = e.detail.value;
    this.setData({
      detailShow: {
        ...detailShow,
        [name]: value
      }
    })
  },

  handlePayTimeChange(e) {
    const { detailShow } = this.data;
    this.setData({
      detailShow: {
        ...detailShow,
        payTime: e.detail.value ?? '',
      }
    })
  },

  handlePayUserIdChange(e) {
    const { detailShow, payUsersSelector } = this.data;
    const index = Number(e.detail.value);
    const { nickname, userId } = payUsersSelector[index];
    this.setData({
      detailShow: {
        ...detailShow,
        payUserId: userId,
        payNickname: nickname
      }
    })
  },

  handleDetailTypeChange(e) {
    const { detailShow } = this.data;
    const index = Number(e.detail.value);
    const type = this.data.detailTypeSelector[index].id;
    const typeName = this.data.detailTypeSelector[index].name;
    this.setData({
      detailShow: {
        ...detailShow,
        type,
        typeName
      }
    })
  },

  handleSettleStatusChange(e) {
    const { detailShow } = this.data;
    const index = Number(e.detail.value);
    const settleStatus = this.data.settleStatusSelector[index].id;
    const settleStatusName = this.data.settleStatusSelector[index].name;
    this.setData({
      detailShow: {
        ...detailShow,
        settleStatus,
        settleStatusName
      }
    })
  },
})