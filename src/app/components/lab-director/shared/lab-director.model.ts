
export class LabDirectorModel {
  Id: number = 0;
  Name: string = '';
  Address: string = '';
  StateId: number = 0;
  City: string = '';
  Zip: number ;
  Fax: string = '';
  Email: string = '';
  PhoneNo: string = '';
  LabId: number = 0;
  LabLicenseStateLevel:number =0;
  StateIds: Array<number> = [];
  Education:string = '';
}

// export class ILabInsurance {
//   LabId: number = 0;
//   InsuranceCompanyId: number = 0;
//   CompanyName: string = '';
// }
