export class CPTCodesModel {
  Id: number = 0;
  Code: string = '';
  LabId: number = 0;
  GeneName: string = '';
  Description: string = '';
  InNetworkFee: number = 0.0;
  cptCodeId: number;
  TypeOfTestId:number=1;
  // active: boolean = false;
  // code: string = ''
  // codeFlag: boolean = false;
  // description: string = '';
  // geneName: string = '';
  // id: number = 0;
  // labId: number = 0;

}

export class ExcelModel {
  Name: string = '';
  File: any;
}

export class IcdCodeModel {
  Id: number;
  Code: string;
  Description: string;
  CPTCodeId: number;
  ICD10Code: string;
  ICD10CodeId: number;
  ICD10CodeIds: number;
  InsuranceCompanyId: number;
}

export class ICD10CodeModel {
  Id: number;
  Code: string;
  Description: string;
  isChecked: boolean = false;
}
export class CPTCodeICDCodeMapping {
  Id: number;
  ICD10CodeIds: Array<number> = new Array<number>();
  CPTCodeId: number;
}