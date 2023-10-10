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