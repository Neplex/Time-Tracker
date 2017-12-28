import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../data-storage/data-storage.service';
import { AVAILABLE_ICONS } from '../global';
import { Category } from '../category';

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
  private subscriptionUpdateCatInAct: Subscription;
  public category: Category;
  public oldCategory: Category;
  public categories: Category[];
  public icons: string[];
  public id: string;
  public newId: number;

  private nameFormControl: FormControl;

  public pageEvent: PageEvent;
  public pageSize: number;
  public pageSizeOptions: number[];

  constructor(private router: Router, private route: ActivatedRoute, private dataBase: DataStorageService) {
    this.category = new Category();
    this.oldCategory = new Category();
    this.newId = 0;
    this.icons = AVAILABLE_ICONS;
    this.nameFormControl = new FormControl('', [Validators.required]);
    this.pageSizeOptions = [20, 50, 100];
    this.pageSize = this.pageSizeOptions[0];
  }

  setExistName(v: boolean){
    this.nameFormControl.setErrors({ existName: v });
  }

  setRequired(v: boolean){
    this.nameFormControl.setErrors({ required: v });
  }

  ngOnInit() {

    this.subscriptionParam = this.route.params.subscribe((param: any) => {
      if ((this.id = param['id']) != null) {
        this.subscriptionDB = this.dataBase.getCategory(this.id).subscribe(cats => {
          this.category = cats;
          this.oldCategory.name = cats.name;
        })
        this.subscription = this.dataBase.getCategories().subscribe(cats => {
          this.categories = cats;
        });
      }
      else{
        this.subscription = this.dataBase.getCategories().subscribe(cats => {
          this.categories = cats;
          this.newId = 0;
          let tabId = [];
          for(let i = 0; i<cats.length; i++){
            tabId.push(cats[i].id);
          }
          tabId.sort();
          for(let id of tabId){
            if(this.newId == parseInt(id)){
              this.newId ++;
            }
            else{
              break;
            }
          }
          this.category.id = this.newId.toString();
        });
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
    if(this.subscription){
      this.subscription.unsubscribe();
    }
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
      // if (this.id && this.oldCategory.name != this.category.name) {
      //   this.dataBase.deleteCategory(this.oldCategory);
      // }
      this.dataBase.saveCategory(this.category);

      this.router.navigate(["activities"]);
    }
  }

  verifyNameCategory(){
    this.setExistName(false);
    this.setRequired(false);

    let catInput = (((this.category.name).toLowerCase()).replace(/[\s]{2,}/g," ")).trim();

    let newCat=true;
    for(var i=0; i<(this.categories).length; i++){
      let catCompare = this.categories[i].name;
      if(catCompare == catInput){
        newCat=false;
      }
    }

    if(catInput != ""){
      if(newCat){
        this.nameFormControl.setValue(this.category.name);
      }
      else{
        if(catInput != ""){
          this.dataBase.getCategoryByName(catInput).subscribe(cat => {
            var categoryFound = null;
            if(catInput != ""){
              this.nameFormControl.setValue(this.category.name);
              categoryFound = (this.category.name).toLowerCase();
              if(cat.id != this.id){
                this.setExistName(true);
              }
            }
          });
        }
      }
    }
    else{
      this.setRequired(true);
    }
  }
}
