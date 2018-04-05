export class SeletedStates {
  InsuranceStateType: number = 0;
  InsuranceCompanyStates: Array<InsuranceCompanyStates> = new Array<InsuranceCompanyStates>();
}
export class InsuranceCompanyStates {
  Id: number;
  InsuranceCompanyId: number;
  StateId: number;
}
export class InsuranceSimulation {
  States: Array<number> = [];
  InsuranceCompanyCodes: Array<String> = [];
  DirectorIncluded: boolean = false;
}

export class InsuranceSimulationDTO {
  States: Array<number> = [];
  InsuranceCompanies: Array<INeoLabInsurance> = new Array<INeoLabInsurance>();
  Labs: Array<INeoLab> = new Array<INeoLab>();
}

export class INeoLabInsurance {
  Code: string;
  Name: string;
  StateId: number;
  States: Array<number> = [];
}

export class INeoLab {
  Code: string;
  Name: string;
  States: Array<number> = [];
  LabTests: Array<any> = [];
  ContractLabs: Array<any> = [];
  Distance: number;
  LabId: number;

}