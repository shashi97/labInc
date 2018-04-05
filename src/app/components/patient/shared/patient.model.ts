import { InsuranceModel } from '../insurance/shared/insurance.model';
export class PatientModel {
  Id: number = 0;
  FirstName: string = '';
  MiddleName: string = '';
  LastName: string = '';
  DateOfBirth: any;
  SSN: string = '';
  MaritalStatus: number = 0;
  Address1: string = '';
  Address2: string = '';
  StateId: number = 0;
  City: string = '';
  Gender: string = '';
  Zip: string = '';
  Email: string = '';
  Phone1: string = '';
  Phone2: string = '';
  Employment: string = '';
  MedicalRecordNo: string = '';
  EmergencyContactName: string = '';
  EmergencyContactPhoneNo: string = '';
  EmergencyContactRelation: string = '';
  PatientGuarantorInfoData: PatientGuarantorInfo = new PatientGuarantorInfo();
  PatientInsurances: Array<any> = new Array<any>();
  MaritalStatusName: string;
  StateName: string;
  isValid: boolean = false;
}

export class PatientGuarantorInfo {
  PatientId: number = 0;
  FirstName: string = '';
  MiddleName: string = '';
  LastName: string = '';
  RelationId: number = 0;
  Gender: string = '';
  DateOfBirth: any;
  SSN: string = '';
  MaritalStatusId: number = 0;
  Address1: string = '';
  Address2: string = '';
  StateId: number = 0;
  City: string = '';
  Zip: string = '';
  ContactNo: string = '';
  Email: string = '';
  MaritalStatusName: string = '';
  StateName: string = '';
  RelationName: string = '';
}

