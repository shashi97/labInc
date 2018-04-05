import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../../core/shared/services';
import { RouteService } from './../../../../shared';
import { OrderService } from '../../shared';
import { OrderModel, OrderTest, ProcessingLabDetail, NeoOrder, OrderSimulation } from '../../shared/order.model';
import { Message } from 'primeng/primeng';
import { LocalStorageService } from '../../../../core/shared/services/index';
import { LabService } from '../../../lab/shared/lab.service';

import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'app-order-simulation-step',
  templateUrl: './order-simulation-step.component.html',
  styleUrls: ['./order-simulation-step.component.css']
})
export class OrderSimulationStepComponent implements OnInit {
  @Input() simulationStep: Array<any> ;
  @Input() isSimulateSave: boolean = false;
  constructor(public orderService: OrderService,
    public labService: LabService,
    public routeService: RouteService
   
  ) {

  }
  ngOnInit() {


    // this.getInsuranceType();
  }


  setColor(item) {
    let style;
    style = {
      'background-color': item.Labs.length === 0 ? 'red' : 'white'
    }
    return style;
  }

  setLabelColor(item) {
    let style;
    style = {
      'color': item.Labs.length === 0 ? 'red' : 'black'
    }
    return style;
  }
}



