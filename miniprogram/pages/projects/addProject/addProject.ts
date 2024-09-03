// pages/projects/addProject/addProject.ts
import { submitAddProject } from '@/service/project/index';
import { projectTypeOptions } from '@/constants/index';
import { formatTimestampToYYYYMMDD } from '@/utils/util';

interface ProjectInfo extends SubmitAddProjectReq {

}

interface AddProjectDataType {
  projectInfo: ProjectInfo,
  projectTypeOptions: typeof projectTypeOptions
}

interface AddProjectCustom {
  handleReset(): void;
  handleSubmit(): Promise<void>;
  handleInputChange(e: WechatMiniprogram.Input): void;
  handleRegionChange(e: WechatMiniprogram.PickerChange): void
  handleProjectTypeChange(e: WechatMiniprogram.PickerChange): void,
}

const initProjectInfo = {
  name: "",
  type: "旅游",
  description: "",
  beginDate: formatTimestampToYYYYMMDD(Date.now()),
  endDate: formatTimestampToYYYYMMDD(Date.now()),
}

Page<AddProjectDataType, AddProjectCustom>({

  /**
   * 页面的初始数据
   */
  data: {
    // 项目类型
    projectTypeOptions,
    // 项目信息
    projectInfo: { ...initProjectInfo },
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

  },

  handleReset() {
    this.setData({ projectInfo: initProjectInfo });
  },

  async handleSubmit() {
    const { projectInfo } = this.data;
    console.log(projectInfo, 'projectInfo');

    wx.showLoading({title: '提交中...'});
    await submitAddProject(projectInfo).finally(() => {
      wx.hideLoading()
    });
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  },

  handleInputChange(e) {
    const {
      detail: {
        value
      },
      target: {
        dataset: {
          name
        }
      }
    } = e;
    const { projectInfo } = this.data;
    this.setData({
      projectInfo: {
        ...projectInfo,
        [name]: value
      }
    })
  },

  handleRegionChange(e) {
    const {
      detail: {
        value
      },
      target: {
        dataset: {
          name
        }
      }
    } = e;
    const { projectInfo } = this.data;
    this.setData({
      projectInfo: {
        ...projectInfo,
        [name]: value
      }
    })
  },

  handleProjectTypeChange(e) {
    const { projectInfo } = this.data;
    const id = Number(e.detail.value);
    const typeName = this.data.projectTypeOptions[id].name;
    this.setData({
      projectInfo: {
        ...projectInfo,
        type: typeName
      }
    })
  }
})