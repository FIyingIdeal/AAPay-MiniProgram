import { submitAddDetail } from '@/service/detail/index';
import { projectDetailTypeOptions } from '@/constants/index';

interface DetailShow extends SubmitAddDetailReq {
  typeName: string;
  settleStatusName: string;
}

interface DataType {
  detailTypeSelector: typeof projectDetailTypeOptions;
  settleStatusSelector:  typeof projectDetailTypeOptions;
  detailShow: DetailShow;
}

interface Custom {
  handleNameInput(e: any): void;
  handleDetailTypeChange(e: any): void;
  handleSettleStatusChange(e: any): void;
  submitAddDetail(): Promise<void>;
}

const initDetailShow = {
  id: 0,
  projectId: 2,
  name: '',
  remark: '',
  type: 0,
  typeName: '',
  amount: 0,
  apportionType: 1,
  payUserId: 1,
  // payTime:,
  settleStatus: 0,
  settleStatusName: "待结算"
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
    // 明细提交信息
    detailShow: initDetailShow,
  },

  handleNameInput(e) {
    const { detailShow } = this.data;
    const name = e.detail.value;
    this.setData({
      detailShow: {
        ...detailShow,
        name
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
    console.log('handleSettleStatusChange: ', e)
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

  async submitAddDetail() {
    const { detailShow } = this.data;
    const { typeName, ...rest } = detailShow;
    const detail: SubmitAddDetailReq = rest;
    console.log(detail, 'detail req');

    await submitAddDetail(detail);
  }
})