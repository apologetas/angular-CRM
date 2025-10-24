import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewCompany} from './components/new-company/new-company';

@Component({
  selector: 'app-root',
  imports: [NewCompany],
  templateUrl: './app.html'
})
export class App {
  protected readonly title = signal('angular2');
}
