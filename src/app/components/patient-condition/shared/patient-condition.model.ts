import {PracticeTypeModel} from '../../practice/shared';
import {ICDCodeModel} from '../../billing-code/shared';
export class PatientConditionModel {
  Id: number = 0;
  Name: string = '';
  PracticeTypes: Array<PracticeTypeModel> = [];
  ICDCodes:Array<ICDCodeModel> = []; 
  PracticeTypeCSV:string = '';
  ICDCodeCSV:string = ''; 
}
