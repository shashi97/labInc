import APP_CONFIG from '../../app.config';

export class Node implements d3.SimulationNodeDatum {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;

  id: string;
  name: string;
  label: string;
  group: number;
  linkCount: number = 0;

  constructor(id, name, label, group) {
    this.id = id;
    this.name = name;
    this.label = label;
    this.group = group;
  }

  normal = () => {
    return Math.sqrt(this.linkCount / APP_CONFIG.N);
  }

  get r() {
    return 30;
  }

  get fontSize() {
    return (10) + 'px';
  }

  get color() {
    let index = Math.floor(APP_CONFIG.SPECTRUM.length * this.normal());
    return APP_CONFIG.SPECTRUM[this.group];
  }
}
