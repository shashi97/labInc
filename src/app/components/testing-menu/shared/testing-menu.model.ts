export class TestingMenuModel {
  Id: number = 0;
  ItemName: string = '';
  IsAnalyte: boolean = false;
  DrugClassId: number = 0;
  TestingType: number = 1;
  TestingTypeValue: string = '';
  BillingCodeTestType: string = '';
  TestName: string = '';
  TestClassTypeId: number = 0;
  TestModalityId: number = 0;
  DrugFamilyId:number =0;
  // CompoundProfileTestList:Array<CompoundProfileTest> = new Array<CompoundProfileTest>();
}

export class BillingCodeModel {
  Id: number = 0;
  TestId: number=0;
  CPTCodeId: number=0;
  BillingCodeTestTypeId: number = 1;
  ItemName: string='';
  CPTCode: string='';
  BillingCodeTestType: string='';
  GCode:string ='';
  ICD10CodeIds:Array<any>=[];
  ICD10Codes:Array<any>=[];
  TestName:string ='';
  ICDCodes:string=''
}
export class FileUploadModel {
  Id: number = 0;
  FileCategory: string = '';
  FileName: string = '';
  FileType: string = '';
  FileSize: number = 0;
  FolderName: string = '';
  LabId: number = 0;
  FileData: string = '';
  FileLink: string = '';
}

export class ICDCodeModel{
  Code:string ='';
  Description:string ='';
  Id:number = 0;
}

