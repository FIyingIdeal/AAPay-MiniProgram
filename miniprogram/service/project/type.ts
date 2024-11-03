interface UserPublicInfo {
  id: number;
  avatar: string;
  nickname: string;
}

interface UserProject {
  id: number;
  name: string;
  type: string;
  description?: string;
  beginDate?: string;
  endDate?: string;
  users: UserPublicInfo[];
}

type GetUserProjectsData = UserProject[];

type GetProjectUsersData = ProjectUserItem[];

// 新增项目请求入参
interface SubmitAddProjectReq {
  name: string;
  type: string;
  description?: string;
  beginDate: string;
  endDate: string;
}
