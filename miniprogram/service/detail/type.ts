interface ProjectDetail extends SubmitAddDetailReq {

}

type QueryProjectDetailsData = ProjectDetail[];

interface SubmitAddDetailReq {
  id: number;
  projectId: number;
  name: string;
  remark: string;
  type: number;
  amount: number;
  apportionType: number;
}

interface SubmitAddDetailData { 
}
