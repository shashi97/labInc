
export class LabContractTest {
  Id: number = 0;
  CptCodeId: number = 0;
  BillingCodeId: number = 0;
  ProcessingFee: number= 0.0;
  ReferralCommission: number = 0.0;
  LabId: number = 0;
  CptCode: string = '';
  GCode: string = '';
  InNetworkFee: number = 0;
  LabToLabContractId: number;
}

export class LabContract {
  Id: number = 0;
  ContractLabName: string = '';
  ContractLabId: number = 0;
  LabToLabContractTests: Array<LabContractTest> = new Array<LabContractTest>();
}

