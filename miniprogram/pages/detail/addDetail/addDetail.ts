import { submitAddDetail } from '@/service/detail/index';

interface DetailTypeItem {
  id: number;
  name: string;
}

interface DetailShow extends SubmitAddDetailReq {
  typeName: string;
}

interface DataType {
  detailShow: DetailShow;
  detailType: DetailTypeItem[];
}

interface Custom {
  bindNameInput(e: any): void;
  bindDetailTypeChange(e: any): void;
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
  // payTime:
}

Page<DataType, Custom>({
  /**
   * 页面的初始数据
   */
  data: {
    // 项目类型下拉选项
    detailType: [
      {
        id: 1,
        name: "餐饮"
      },
      {
        id: 2,
        name: "交通"
      },
      {
        id: 3,
        name: "住宿"
      },
      {
        id: 4,
        name: "门票"
      },
      {
        id: 5,
        name: "购物"
      },
      {
        id: 6,
        name: "零食"
      },
      {
        id: 7,
        name: "医疗"
      },
      {
        id: 0,
        name: "其他"
      }
    ],
    // 明细提交信息
    detailShow: initDetailShow
  },

  bindNameInput(e) {
    const { detailShow } = this.data;
    const name = e.detail.value;
    this.setData({
      detailShow: {
        ...detailShow,
        name
      }
    })
  },

  bindDetailTypeChange(e) {
    const { detailShow } = this.data;
    const index = Number(e.detail.value);
    const type = this.data.detailType[index].id;
    const typeName = this.data.detailType[index].name;
    this.setData({
      detailShow: {
        ...detailShow,
        type,
        typeName
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