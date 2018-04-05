export class PrescribedMedicineModel {
  Id: number = 0;
  DrugName: string = '';
  DrugClassId: number = 0;
  isedit: boolean = false;
}

export class DrugClass {
  Id: number = 0;
  ClassName: string = '';
  IsDrugClass: boolean = false;
  isEdit: boolean = false;
  selectedValue: string = 'test';
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
