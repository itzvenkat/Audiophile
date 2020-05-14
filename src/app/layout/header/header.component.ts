import { Component, OnInit } from '@angular/core';
import { APP } from 'src/app/app.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  headerLogo: string = APP.headerLogo;
  title: string = APP.headerName;
  tipInfo: string = APP.headerTip;
  constructor() { }

  ngOnInit(): void {
  }

}
