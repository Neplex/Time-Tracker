import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatIconModule, MatToolbarModule, MatListModule, MatSidenavModule, MatInputModule, MatSelectModule, MatDialogModule, MatMenuModule, MatCardModule, MatNativeDateModule, MatDatepickerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  declarations: []
})
export class AngularMaterialModule { }
