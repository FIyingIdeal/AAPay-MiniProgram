interface UserPublicInfo {
  id: number;
  avatar: string;
  nickname: string;
}

interface ProjectResponse {
  id: number;
  name: string;
  type: string;
  description?: string;
  beginDate?: string;
  endDate?: string;
  users: UserPublicInfo[];
}


interface DetailRequest {
  projectId: number
}