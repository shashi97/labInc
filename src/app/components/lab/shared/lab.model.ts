
export class LabModel {
  Id: number = 0;
  Name: string = '';
  Address: string = '';
  StateId: number = 0;
  City: string = '';
  Zip: string = '';
  Fax: string = '';
  Email: string = '';
  Phone: string = '';
  Password: string = '';
  ConfirmPassword: string = '';
  Longitude: number;
  Latitude: number;
  LabLicenseStateLevel: number = 0;
  Icon: string = '';
  Code: string = '';
  LabInsurances: Array<ILabInsurance> = Array<ILabInsurance>();
  LabStates: Array<LabStates> = Array<LabStates>();
  StateIds: Array<number> = [];
  LabComplexityId: number = 0;

}

export class ILabInsurance {
  LabId: number = 0;
  InsuranceCompanyId: number = 0;
  CompanyName: string = '';
}


export class LabStates {
  Id: number = 0;
  LabId: number = 0;
  StateId: number = 0;
  StateName?: string;
}

export class SalesOfficeModel {
  SalesOfficeName: string;
  SalesOfficeCode: string;
  Address: string;
  City: string;
  Zip: number;
  Fax: string;
  StateId: number;
  PhoneNo: string;
  Email: string;
  IsSelected?: boolean;
}

export class SalesOfficeLab {
  Id: number = 0;
  LabId: number = 0;
  SalesOfficeId: number;
  SalesOfficeName: string;
}
