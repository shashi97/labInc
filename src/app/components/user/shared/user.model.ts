
export class UserModel {
  Id: number = 0;
  Name: string = '';
  Email: string = '';
  PhoneNo: string = '';
  Password: string = '';
  ConfirmPassword: string = '';
  RoleId: number = 0;
  LabId: number = null;
  PracticeId: number = null;
  IsActive: boolean = true;
  PracticeName: string = '';
  UserTypeId: number = 1;
  LabName: string = '';
  EntityName: string = '';
  LinkedTableId:number = 0;
}
export class SalesOfficeModel {
  Id: number = 0;
  SalesOfficeName: string = '';
  SalesOfficeCode:string = '';
  Address: string = '';
  StateId: number = 0;
  City: string = '';
  Zip: string = '';
  Fax: string = '';
  Email: string = '';
  PhoneNo: string = '';
  Password: string = '';
  ConfirmPassword: string = '';
  // LabInsurances: Array<ILabInsurance> = Array<ILabInsurance>();
}
