import { Component, HostListener } from '@angular/core';
import { APP } from './app.constants';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = APP.title;
  headerLogo = APP.headerLogo;
  _isMobileView: boolean = false;

  constructor(private store: StoreService) {
    this.onResize(null);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this._isMobileView = (window.innerWidth <= 600 || window.innerHeight <= 600);
    this.store.setScreen(this._isMobileView);
  }
}
