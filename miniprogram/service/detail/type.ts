interface ProjectDetail extends SubmitAddDetailReq {
  payDate: string;
}

type QueryProjectDetailsData = ProjectDetail[];
type QueryProjectDetailsGroupByDate = Map<string, ProjectDetail[]>;

interface SubmitAddDetailReq {
  id: number;
  projectId: number;
  name: string;
  remark: string;
  type: number;
  amount: number;
  settleStatus: number;
  apportionType: number;
  payTime: string;
  payUserId: number;
}

interface SubmitAddDetailData { 
}
