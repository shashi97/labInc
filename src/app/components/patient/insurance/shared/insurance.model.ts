
export class InsuranceModel {
  Id: number = 0;
  InsuranceTypeId: number = 0;
  InsuranceCompanyId: number = 0;
  PatientId: number = 0;
  RelationId: number = 0;
   PolicyId: string = '';
  GroupName: string = '';
  GroupNumber: string = '';
   ValidityOfPolicy: Date ;
   NameOfInsured: string = '';
  isValid: boolean = false;
  IsActive: boolean = false;
  StartDate: Date;
}
