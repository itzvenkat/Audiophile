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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from '../pipes/search.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { PlaylistComponent } from './playlist/playlist.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    MainComponent,
    SearchPipe,
    PlaylistComponent
  ],
  imports: [
    CommonModule,
    MainAppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    MatTabsModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    ScrollingModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule { }
