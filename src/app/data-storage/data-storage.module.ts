import { NgModule, Injectable, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataStorageService } from './data-storage.service';
import { Activity } from '../activity';
import { Category } from '../category';



@NgModule({
  imports: [
    CommonModule
  ],
  // exports: [
  //   DataStorageService
  // ],
  providers: [
    DataStorageService
  ],
  declarations: []
})
export class DataStorageModule { }
