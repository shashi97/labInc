
export class InsuranceCompanyModel {
  Id: number = 0
  CompanyCode: string = '';
  CompanyName: string = '';
  Address1: string = '';
  Address2: string = '';
  StateId: number = 0;
  City: string = '';
  Zip: string = '';
  Fax: string = '';
  Phone1: string = '';
  Phone2: string = '';
  Email: string = '';
  Website: string = '';
  PayerId: string = '';
  Adjuster: string = '';
  Status: string = '';
  NelcPayNum: string = '';
  InsuranceCompanyTypeId: number = 0;
  StateName: string = '';
  LabInsuranceStates: string = '';
  CompanyTypeName: string = '';
  InsuranceStateLevel: number = 0;
  StateIds: any[];
  InsuranceCompanyStates: string = '';
  TradingPartnerId:number = 0;
}

export class InsuranceCompanyTypeModel {
  Id: number = 0;
  Name: string = '';
  isedit: boolean = false;
}

export class InsuranceCompanyStates {
  InsuranceCompanyId: number;
  StateId: number;
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

export class InsuranceCompanyState {
  InsuranceCompanyId: number;
  StateId: number;
  IsAcceptGCode: boolean = false; 
  StateName: string;
  StateCode: string;
  InsuranceStateLevel: number;
  UtilizationProfileId: number;
  TestProfileId:number=0;
 
}

