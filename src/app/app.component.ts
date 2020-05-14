import { Component } from '@angular/core';
import { APP } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = APP.title;
  headerLogo = APP.headerLogo;
}
