export class OrderModel {
  Id: number = 0;
  LocationId: number = 0;
  PatientId: number;
  MedicalRecordNo: string = '';
  DateCollected: any;
  CaseTypeId: number;
  Volumn: string = '';
  DateReceived: any;
  PrimaryPhysicianId: number;
  PrimaryPhysicianName: string = '';
  SecondaryPhysicianId: number;
  CcPhysicianId: number;
  ScientistId: number;
  GroupTestId: number;
  Comments: string = '';
  InsuranceTypeId: number;
  IcdCode: Array<OrderICDCode> = Array<OrderICDCode>();
  test: Array<number> = Array<number>();
  Tests: Array<TestModel> = Array<TestModel>();
  ValidationTests: Array<TestModel> = Array<TestModel>();
  PrescribedMedicines: Array<number> = Array<number>();
  ICDCodes: Array<number> = Array<number>();
  PatientName?: string = '';
  PatientInsuranceId: number;
  InsuranceCompanyName: string = '';
  OrderNo?: number;
  BillingLabId: number;
  PreferredLabId: number;
  StatusId: number;
  IsInReview: boolean;
  LabName: string = '';
  IsDraft: boolean = false;
  PatientConditionId: number;
  PatientRiskId: number;
  TestToBeProcessedByUs?: Array<TestToBeProcessedByUsModel> = new Array<TestToBeProcessedByUsModel>();
  TestCanNotProcess?: Array<TestToBeProcessedByUsModel> = new Array<TestToBeProcessedByUsModel>();
  TestToBeProcessedByOther?: Array<TestToBeProcessedByUsModel> = new Array<TestToBeProcessedByUsModel>();
  OrderEligibilities: Array<OrderEligibilityCheck> = new Array<OrderEligibilityCheck>();
}

export class TestToBeProcessedByUsModel {
  ProcessingLabId?: number;
  ProcessingLabName?: string;
  ProcessingLabCode?: string;
  TestName?: string;
  CPTCode?: string;
  OrderTests?: Array<OrderTestModel> = new Array<OrderTestModel>();
}

export class OrderTestModel {
  Id: number;
  OrderId: number;
  TestId: number;
  TestName: string;
  CPTCode: string;
  ProcessingFee?: number;
  ReferralCommission?: number;
}

export class ProcessingLabDetail {
  OrderTestId?: number;
  OrderId?: number;
  ContractLabId?: number;
  ProcessingFee?: number;
  ReferralCommission?: number;
  TestId?: number;
  TestName?: string;
  CPTCode?: string;
  LabName?: string;
  LabAddress?: string;
  LabCity?: string;
  LabZip?: string;
  LabPhone?: string;
  LabState?: string;
  OrderTests?: Array<OrderTestModel> = new Array<OrderTestModel>();
}

export class OrderICDCode {
  Id: number = 0;
  OrderId: number = 0;
  ICDCodeId: number = 0;
}

export class OrderPrescribedMedicine {
  Id: number = 0;
  OrderId: number = 0;
  PrescribedMedicineId: number = 0;
}

export class OrderTest {
  Id: number = 0;
  OrderId: number = 0;
  TestId: number = 0;
}

export class OrderFilter {
  DateTypeSelect: number = 1;
  FromDate: string;
  ToDate: string;
  NetworkType: number = 1;
  LabId: number;
  PreferredLabId: number;
  ProcessingLabId: number;
  InsuranceName: string = '';
  BillingLabId: number;
  InsuranceCompanyId: number;
  StatusId: number;
  TestId: number;
  TestName: string = '';
  PatientName: string = '';
  OrderStatusId: number;
  PracticeId: number;
  
}

export class TestModel {
  OrderId: number;
  TestId: number;
  ProcessingLabId: number;
  StatusId: number;
  IsGroupTest: any;
  TestingType: number;
  ItemName: string;
  Status?: number;
}
export class OrderEligibilityCheck {
  
  EligibilityCheckName: string = "";
  FailingReason: string = "";
  OrderId: number = 0;
  IsFailed?: boolean;
  Id: number = 0;
}

export class OrderDTOModel {
  Id: number = 0;
  OrderDate: string = '';
  OrderNo: string = '';
  PatientId: number = 0;
  PatientName: string = '';
  PracticeId: number = 0;
  PracticeName: string = '';
  BillingLabId: number = 0;
  BillingLabName: string = '';
  PreferredLabId: number = 0;
  PreferredLabName: string = '';
  PatientInsuranceId: number = 0;
  PatientInsuranceName: string = '';
  StatusId: number = 0;
  StatusName: string = '';
  OrderTests: Array<OrderTestDTO> = [];
  ProcessingLabs: Array<ProcessingLabDTO> = [];
}

export class ProcessingLabDTO {
  OrderId: number;
  ProcessingLabCode: string;
  ProcessingLabId: number = 0;
  ProcessingLabName: string = ''
  OrderTests: Array<OrderTestDTO> = [];
}
export class CustomDDO {
  label: string = 'Any';
  value: number = null;
}


export class OrderTestDTO {
  Id: number;
  CPTCode: string = '';
  OrderId: number;
  ProcessingFee: number;
  ProcessingLabCode: string;
  ProcessingLabId: number;
  ProcessingLabName: string;
  ReferralCommission: number;
  TestId: number;
  TestName: string;


}
export class NeoOrder {
  Name: string;
  OrderLogs: Array<NeoOrderLog> = new Array<NeoOrderLog>();
}

export class NeoOrderLog {
  Text: string;
  Date: any;
}
export class OrderSimulation {
  Id: number;
  LabId: number;
  GroupTestId: number;
  PatientId: number;
  InsuranceTypeId: number;
  PracticeId: number;
  PatientInsuranceId: number;
  Tests: Array<TestModel> = Array<TestModel>();
  ValidationTests: Array<TestModel> = Array<TestModel>();
  PatientName: string;
  InsuranceCompanyName: string;
  OrderNo: number;
}
