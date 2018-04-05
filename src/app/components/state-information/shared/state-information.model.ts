export class SeletedStates {
  InsuranceStateType: number = 0;
  InsuranceCompanyStates: Array<InsuranceCompanyStates> = new Array<InsuranceCompanyStates>();
}
export class InsuranceCompanyStates {
  Id:number;
  InsuranceCompanyId: number;
  StateId: number;
}