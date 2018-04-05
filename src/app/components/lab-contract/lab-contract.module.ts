import { NgModule } from '@angular/core';
import { labContractRouting } from './lab-contract.routing';
import { SharedComponentModule } from '../shared/shared-component.module';
import { OrderGraphComponent } from './lab-contract-graph/graph.component'
import { D3Service, D3_DIRECTIVES } from './lab-contract-graph/d3';
import { GraphComponent } from './lab-contract-graph/visuals/graph/graph.component';
import { SHARED_VISUALS } from './lab-contract-graph/visuals/shared';
import {
  LabContractComponent,
  ContractLabComponent,
  LabContractService,
  ContractDocmentComponent,
  LabContractLeftNavbarComponent,
  ContractDocumnetService,
  LabOrderComponent
} from './index';


@NgModule({
  imports: [
    SharedComponentModule,
    labContractRouting
  ],
  declarations: [
    GraphComponent,
    ...SHARED_VISUALS,
    ...D3_DIRECTIVES,
    LabContractComponent,
    ContractLabComponent,
    ContractDocmentComponent,
    OrderGraphComponent,
    LabContractLeftNavbarComponent,
    LabOrderComponent

    
  ],
  providers: [
    LabContractService,
    ContractDocumnetService,
    D3Service
  ]
})

export class LabContractModule { }
