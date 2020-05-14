import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainAppRoutingModule } from "./app-routing.module";
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../pipes/search.pipe';

@NgModule({
  declarations: [
    MainComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    MainAppRoutingModule,
    FormsModule,
    MatTabsModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    ScrollingModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule { }
