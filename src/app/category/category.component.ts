import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../data-storage/data-storage.service';
import { Category } from '../category';
import { AVAILABLE_ICONS } from '../global';

import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  private subscriptionParam: Subscription;
  private subscriptionDB: Subscription;
  private subscription: Subscription;
  public category: Category;
  public oldCategory: Category;
  public categories: Category[];
  public icons: string[];
  public id: string;

  private nameFormControl: FormControl;

  public pageEvent: PageEvent;
  public pageSize: number;
  public pageSizeOptions: number[];

  constructor(private router: Router, private route: ActivatedRoute, private dataBase: DataStorageService) {
    this.category = new Category();
    this.oldCategory = new Category();
    this.icons = AVAILABLE_ICONS;
    this.nameFormControl = new FormControl('', [Validators.required]);
    this.pageSizeOptions = [20, 50, 100];
    this.pageSize = this.pageSizeOptions[0];
  }

  setExistName(v: boolean){
    this.nameFormControl.setErrors({ existName: v });
  }

  ngOnInit() {

    this.subscription = this.dataBase.getCategories().subscribe(cats => {
      this.categories = cats;
    });

    this.subscriptionParam = this.route.params.subscribe((param: any) => {
      if ((this.id = param['id']) != null) {
        this.subscriptionDB = this.dataBase.getCategory(this.id).subscribe(cats => {
          this.category = cats;
          this.oldCategory.name = cats.name;
        })
      }
    });

    this.pageEvent = new PageEvent;
    this.pageEvent.pageIndex = 0;
    this.pageEvent.length = this.icons.length;
  }

  ngOnDestroy() {
    this.subscriptionParam.unsubscribe();
    if(this.subscriptionDB){
      this.subscriptionDB.unsubscribe();
    }
    this.subscription.unsubscribe();
  }

  paginationFrom(pageEvent) {
    return ((pageEvent.pageIndex === 0) ? pageEvent.pageIndex : (pageEvent.pageIndex) * pageEvent.pageSize );
  }

  paginationTo(pageEvent) {
    if(pageEvent.pageSize){
      this.pageSize = pageEvent.pageSize;
    }
    return this.paginationFrom(pageEvent) + this.pageSize;
  }

  saveCategory() {
    if(this.nameFormControl.errors == null){
      this.category.name = (((this.category.name).toLowerCase()).replace(/[\s]{2,}/g," ")).trim();
      if (this.id && this.oldCategory.name != this.category.name) {
        this.dataBase.deleteCategory(this.oldCategory);
      }
      this.dataBase.saveCategory(this.category);
      this.router.navigate(["activities"]);
    }
  }

  verifyNameCategory(){
    this.setExistName(false);

    let catInput = (((this.category.name).toLowerCase()).replace(/[\s]{2,}/g," ")).trim();
    let catPram = "";
    if (this.id != null) {
      catPram = (((this.id).toLowerCase()).replace(/[\s]{2,}/g," ")).trim();
      catPram.replace(/[\s]{2,}/g," ");
    }

    let newCat=true;
    for(var i=0; i<(this.categories).length; i++){
      let catCompare = (((this.categories[i].name).toLowerCase()).replace(/[\s]{2,}/g," ")).trim();
      if(catCompare == catInput){
        newCat=false;
      }
    }

    if(newCat){
      this.nameFormControl.setValue(this.category.name);
    }
    else{
      this.dataBase.getCategory(catInput).subscribe(cat => {
        var categoryFound = null;
        if(catInput != ""){
          this.nameFormControl.setValue(this.category.name);
          categoryFound = (this.category.name).toLowerCase();
          if(catInput != catPram){
            this.setExistName(true);
          }
        }
      });
    }
  }
}
