import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatListModule,
  MatSidenavModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule
    MatSelectModule,
    MatInputModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
  ],
  declarations: []
})
export class AngularMaterialModule { }
