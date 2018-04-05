
export class PracticeModel {
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
  TaxId: string = '';
  NPI: string = '';
  ContactPerson: string = '';
  PracticeTypeId: number = 0;
  LabId: number;
  SalesOfficeId: number = 0;
  SalesRepresentativeId: number = 0;
  // PracticeInsurances: Array<IPracticeInsurance> = Array<IPracticeInsurance>();
}

export class IPracticeInsurance {
  PracticeId: number = 0;
  InsuranceCompanyId: number = 0;
  CompanyName: string = '';
}
export class PracticeTypeModel {
  Id: number = 0;
  Name: string = '';
  isedit: boolean = false;
}

export class NPIExists {
  Message: string;
  Flag: number;
}
