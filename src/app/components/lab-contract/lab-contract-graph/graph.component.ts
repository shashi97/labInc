import { Component, OnInit, ChangeDetectorRef, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { Node, Link } from './d3';
import { LabService } from '../../lab/shared';
import { D3Service, ForceDirectedGraph } from './d3';

@Component({
  selector: 'order-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})

export class OrderGraphComponent implements OnInit {
  nodes: Node[] = [];
  links: Link[] = [];
  graph: ForceDirectedGraph;
  private _options: { width, height } = { width: 600, height: 500 };

  get options() {
    return this._options = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
  constructor(private labService: LabService, private d3Service: D3Service, private ref: ChangeDetectorRef) {


  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.graph.initSimulation(this.options);
  }
  ngAfterViewInit() {

  }
  ngOnInit() {
    this.labService.getLabsForGraph().then((res) => {
      let result = res.data;
      this.loadGraph(result.links, result.nodes);
    });
  }
  loadGraph(links, nodes) {
    const N = nodes.length,
      getIndex = number => number - 1;
    nodes.forEach(node => {
      this.nodes.push(new Node(node.id, node.name, node.label, node.group));
    });
    links.forEach(link => {
      this.nodes[getIndex(link.source)].linkCount++;
      this.nodes[getIndex(link.target)].linkCount++;
      this.links.push(new Link(this.nodes[getIndex(link.source)], this.nodes[getIndex(link.target)], link.type));
    });
    this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this.options);

    /** Binding change detection check on each tick
     * This along with an onPush change detection strategy should enforce checking only when relevant!
     * This improves scripting computation duration in a couple of tests I've made, consistently.
     * Also, it makes sense to avoid unnecessary checks when we are dealing only with simulations data binding.
     */
    this.graph.ticker.subscribe((d) => {
      this.ref.markForCheck();
    });
  }
}
