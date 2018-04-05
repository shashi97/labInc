import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  url = 'https://gitlab.apeasycloud.com/maddy/labtrac-ui';
  title: string;

  constructor() {
    this.title = 'app works!';
  }
}


