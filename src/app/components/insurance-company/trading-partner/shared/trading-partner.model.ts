
export class TradingPartnerImportModel {
  Id: string  = '';
  Name: string = '';
  IsSelected:boolean;
  InsuranceCompanyId:number = 0;
  TradingPartnerId:number = 0;
  isedit: boolean = false;
}
export class TradingPartnerModel {
  Id: number = 0;
  Name: string = '';
  IsSelected:boolean;
  InsuranceCompanyId:number = 0;
  TradingPartnerId:number = 0;
  isedit: boolean = false;
}