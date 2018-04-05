
export class ImportFileModel {
  Id: number = 0;
  Name: string ='';
  Address: string ='';
  StateId: number = 0;
  City: string ='';
  Zip: number;
  Fax: string ='';
  Email: string ='';
  Phone: string ='';
  PracticeId: number;
  NPI: string = '';
  PhysicianLocations: Array<number> = new Array<number>();
  PhysicianSpecialityId: number= 0;
  PhysicianLocationAssociation: string ='';
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
  UploadType:number = 0;
}

