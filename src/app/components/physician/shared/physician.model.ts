
export class PhysicianModel {
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

export class PhysicianTypeModel {
  Name: string ='';
  Id: number = 0;
}
export class PhysicianSpeciality {
  Name: string = '';
  Id: number = 0;
  isedit:boolean= false;
}

