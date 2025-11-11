import { Component, signal } from '@angular/core';

import {Toast} from 'primeng/toast';

import {RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [ Toast, RouterOutlet],
  templateUrl: './app.html'
})
export class App {
  protected readonly title = signal('angular2');
}
