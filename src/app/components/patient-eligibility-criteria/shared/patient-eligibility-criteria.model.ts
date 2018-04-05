
export class PatientEligibilityCriteriaModel {
  PatientConditionId: number = 0;
  RiskGroupId: number = 0;
  TypeOfTestId: number = 1;
  FrequencyTypeId: number = 0;
  FrequencyNumber: number;
  InsuranceCompanyId: number = 0;
  PatientConditionName: string = '';
  RiskGroupName: string = '';
  TypeOfTestName: string = '';
  FrequencyTypeName: string = '';
  InsuranceCompanyName: string = '';
  Id: number = 0;
  Name: string = '';
}

// export class ILabInsurance {
//   LabId: number = 0;
//   InsuranceCompanyId: number = 0;
//   CompanyName: string = '';
// }
