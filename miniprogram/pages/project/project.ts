// pages/project/project.ts
import aapayReqest from '@/service/http'
interface DataType {
  project: ProjectResponse;
  projects: ProjectResponse[];
}
interface Custom {
  getProjectById(): Promise<ProjectResponse>;
  getUserProjects(): Promise<BaseResponse<ProjectResponse[]>>;
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // this.getProjectById()
    //   .then((data) => {
    //     console.log('data = ', data);
    //     this.setData({
    //       project: data.data
    //     })
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   } );
    this.getUserProjects().then((data) => {
      this.setData({
        projects: data.data
      });
      console.log('projects = ', data.data)
    }).catch(err => {
      console.log(err);
    })
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  getProjectById(): Promise<ProjectResponse> {
    return new Promise((rs, rj) => {
      wx.request({
        url: 'http://localhost:8080/aapay/project/2',
        method: 'GET',
        success(resp) {
          rs(resp.data as ProjectResponse)
        },
        fail(resp) {
          rj(resp.errMsg)
        }
      })
    })
  },

  getUserProjects() {
    return new Promise((rs, rj) => {
      aapayReqest({
        url: '/project/list?userid=1',
        method: 'GET',
        success(resp) {
          console.log("resp = ", resp)
          rs(resp.data as BaseResponse<ProjectResponse[]>)
        },
        fail(resp) {
          rj(resp.errMsg)
        }
      })
    })
  }
})