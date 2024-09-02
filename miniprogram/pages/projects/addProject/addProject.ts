// pages/projects/addProject/addProject.ts
import { submitAddProject } from '@/service/project/index';

interface KvSelectorItem {
  id: number;
  name: string;
}

interface ProjectInfo extends SubmitAddProjectReq {

}

interface AddProjectDataType {
  projectInfo: ProjectInfo,
  defaultProjectTypes: KvSelectorItem[]
}

interface AddProjectCustom {
  handleProjectTypeChange(e: any): void,
}

const defaultProjectTypes = [
  {
    id: 1,
    name: "旅游"
  },
  {
    id: 2,
    name: "团队活动"
  },
  {
    id: 0,
    name: "其他"
  }
]

const initProjectInfo = {
  name: "",
  type: "旅游",
  beginDate: "",
  endDate: ""
}

Page<AddProjectDataType, AddProjectCustom>({

  /**
   * 页面的初始数据
   */
  data: {
    // 项目类型
    defaultProjectTypes: defaultProjectTypes,
    // 项目信息
    projectInfo: initProjectInfo,
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

  handleProjectTypeChange(e) {
    const { projectInfo } = this.data;
    const index = Number(e.detail.value);
    const typeName = this.data.defaultProjectTypes[index].name;
    this.setData({
      projectInfo: {
        ...projectInfo,
        type: typeName
      }
    })
  }
})