export class BillingCodeModel {
  Id: number = 0;
  DefaultReferralCommission: number;
  TestId:number =0;
  CPTCode:string = '';
  GCode: number;
  BillingCodeTestTypeId:number = 1;
  LabId:number = 0;
  TestName:string='';
  // CompoundProfileTestList:Array<CompoundProfileTest> = new Array<CompoundProfileTest>();
}

export class ICDCodeModel{
  Id:number=0;
  Code:string='';
  Description:string='';

}


