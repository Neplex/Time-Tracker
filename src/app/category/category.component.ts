import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../data-storage/data-storage.service';
import { Category } from '../category';
import { AVAILABLE_ICONS } from '../global';

import { AbstractControl } from '@angular/forms';

let nameFound: boolean = false;

let okToSave: boolean = false;

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

  constructor(private router: Router, private route: ActivatedRoute, private dataBase: DataStorageService) {
    this.category = new Category();
    this.oldCategory = new Category();
    this.icons = AVAILABLE_ICONS;
    this.nameFormControl = new FormControl('', [
      Validators.required,
      this.existNameValidator
    ]);
  }

  existNameValidator(control: AbstractControl) {
    if(nameFound){
      return { existName: nameFound };
    }
    return null;
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
  }

  ngOnDestroy() {
    this.subscriptionParam.unsubscribe();
    if(this.subscriptionDB){
      this.subscriptionDB.unsubscribe();
    }
    this.subscription.unsubscribe();
  }

  saveCategory() {
    if(okToSave){
      this.category.name = (((this.category.name).toLowerCase()).replace(/[\s]{2,}/g," ")).trim();
      if (this.id != this.category.name) {
        this.dataBase.deleteCategory(this.oldCategory);
      }
      this.dataBase.saveCategory(this.category);
      this.router.navigate(["activities"]);
    }
  }

  verifyNameCategory(){
    nameFound=false;
    okToSave=false;

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
      this.nameFormControl = new FormControl(this.category.name, [Validators.required, this.existNameValidator]);
      okToSave=true;
    }
    else{
      this.dataBase.getCategory(catInput).subscribe(cat => {
        var categoryFound = null;
        if(catInput != ""){
          this.nameFormControl = new FormControl(this.category.name, [Validators.required, this.existNameValidator]);
          categoryFound = (this.category.name).toLowerCase();
          if(catInput == catPram){
            okToSave = true;
          }
          else{
            nameFound=true;
          }
        }
      });
    }
  }
}
