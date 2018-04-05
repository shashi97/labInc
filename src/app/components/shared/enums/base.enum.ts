export enum PaginationEnum {
  PageSize = 10
}

export enum DefaultRole {
  SuperUser = 1,
  LabOwner = 2,
  User = 3,
  Administrator = 4
}

export enum ControlType {
  TextBox = 1,
  CheckBox = 2,
  RadioButton = 3,
  Date = 4,
  Number = 5,
  DropDown = 6
}

export enum AssetTypeCategory {
  DocumentFolder = 1,
  DocumentStore = 2,
  LabPosition = 3,
  Employee = 4,
  Device = 5
}

export enum AssetType {
  Document = 1,
  Employee = 2,
  Device = 3
}

export enum ModuleCategory {
  DocumentFile = 3,
  DocumentFolder = 2,
  CheckList = 1

}

export enum LabPosition {
  Director = 2,
  TechnicalConsultant = 3,
  ClinicalConsultant = 4,
  TestingPersonnel = 5,
  GeneralSupervisor = 6,
  TechnicalSupervisor = 7
}

export enum classification {
  Moderate = 1,
  HighComplexity = 2
}

export enum component {
  Dropdown ,
  CheckboxWithAttachment ,
  Attachment ,
  RadioWithAttachment 
}

export enum UserTypeEnum {
 InNetwork = 1,
 Lab = 2,
 Practice = 3,
 SalesOffice = 4,
 SalesRepresentative = 5
}
export enum ImportFileEnum {
Insurance = 1,
CPTCode = 2,
DrugClass = 3,
ICD10Code = 4,
TestClassType = 5,
TestingMenu = 6,
TestModality = 7,
PrescribedDrugs = 8,
SalesOffice = 9,
Laboratory = 10
}
