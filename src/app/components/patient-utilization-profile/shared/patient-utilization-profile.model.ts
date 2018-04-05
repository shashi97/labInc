export class PatientUtilizationModel {
  Id: number;
  PatientUtilizationNameId: number;
  FrequencyId: number;
  FrequencyNumber: string;
  Name: string;
  UtilizationProfilePatientCriterias: Array<any> = new Array<any>();
}

export class UtilizationProfilePatientCriteriaModel {
  Id: number;
  UtilizationProfileId: number;
  PatientEligibilityCriteriaId: number;
  PatientEligibilityCriteriaName: string;
  FrequencyTypeId: number;
  FrequencyNumber: number;
  FrequencyTypeName: string;
  
  // FrequencyTypeName?: string;
}

export class PatientEligibilityCriteriaModel {
  Name: string;
  PatientConditionId: number;
  RiskGroupId: number;
  TypeOfTestId: number;
  PatientConditionName: string;
  RiskGroupName: string;
  TypeOfTestName: string;
  label: string;
  value: any;
}
