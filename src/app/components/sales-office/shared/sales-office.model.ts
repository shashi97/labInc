
export class SalesOfficeModel {
  Id: number = 0;
  SalesOfficeName: string = '';
  SalesOfficeCode: string = '';
  Address: string = '';
  StateId: number = 0;
  City: string = '';
  Zip: string = '';
  Fax: string = '';
  Email: string = '';
  PhoneNo: string = '';
  Password: string = '';
  ConfirmPassword: string = '';
  LinkedTableId: number;
  LoggedTypeId: number;
  isEdit: boolean = false;
   IsSelected?: boolean;


  // LabInsurances: Array<ILabInsurance> = Array<ILabInsurance>();
}

export class SalesOfficeLab {
  Id: number = 0;
  LabId: number = 0;
  SalesOfficeId: number;
  SalesOfficeName: string;
  Email: string;
  Address: string;
  Zip: string;
}

// export class ILabInsurance {
//   LabId: number = 0;
//   InsuranceCompanyId: number = 0;
//   CompanyName: string = '';
// }
