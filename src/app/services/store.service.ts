import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  private screenSize: BehaviorSubject<boolean> = new BehaviorSubject(false);
  _isMobileView = this.screenSize.asObservable();

  setScreen(data: boolean) {
    this.screenSize.next(data);
  }
}
