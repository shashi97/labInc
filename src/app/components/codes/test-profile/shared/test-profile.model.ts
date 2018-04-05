export class TestProfileModel {
  Id: number = 0;
  Name: string = '';
  TestProfileItems: Array<TestProfileItemModel> = []
}

export class TestProfileItemModel {
  Id: number = 0;
  TestProfileId: number = 0;
  IsDeleted: boolean = false;
  RowIndex: number = 0;
  CPTCodes: Array<CPTCodeModel> = [];
  ICD10Codes: Array<ICDCodeModel> = [];
  TestProfileCPTICDMappings: Array<TestProfileCPTICDMappingModel> = [];
}

export class TestProfileCPTICDMappingModel {
  Id: number = 0;
  TestProfileItemId: number = 0;
  CPTCodeId: number = 0;
  ICD10CodeId: number = 0;
  CPTCodeName: string = ''
  ICD10CodeName: string = ''
}
export class CPTCodeModel {
  Code: string = '';
  Description: string = '';
  TypeOfTestId: number = 0;
  TypeOfTestName: string = '';
  IsSelected: boolean = true;
  ExcelFileName: string = '';
  Id: number = 0;

}

export class ICDCodeModel {
  Id: number = 0;
  Code: string = '';
  Description: string = '';
}