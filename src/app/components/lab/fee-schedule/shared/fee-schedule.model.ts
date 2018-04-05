export class FeeSchedule {
  Id: number = 0;
  CPTCode: string = '';
  Description: string = '';
  ContractFee: number = 0;
  LabInsuranceId: number = 0;
  EffectiveDate: string = '';
  ExpirationDate: string = '';
  LabInsuranceStateId: number;
}

export class StateModel {
  InsuranceCompanyId: number;
  State: string = '';
  StateCode: string = '';
  LabId: number;
  Id: number;
  StateId: number;
  isChecked?:boolean = false;
}

export class LabInsuranceStateModel {
  Id: number;
  Code: string;
  Name: string;
  IsTerritory: boolean;
  isChecked?: boolean = false;
}
