import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../data-storage/data-storage.service';
import { AVAILABLE_COLORS } from '../global';
import { Activity } from '../activity';
import { Category } from '../category';

import { AbstractControl } from '@angular/forms';

let nameFound: boolean = false;

let okToSave: boolean = false;

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  private subscriptionParam: Subscription;
  private subscriptionDB: Subscription;
  private subscription: Subscription;
  public activity: Activity;
  public oldActivity: Activity;
  public activities: Activity[];
  public categories: string[];
  public colors: string[];
  public id: string;

  public categoriesControl: FormControl;

  private nameFormControl: FormControl;

  constructor(private router: Router, private route: ActivatedRoute, private dataBase: DataStorageService) {
    this.activity = new Activity();
    this.oldActivity = new Activity();
    this.activities = [];
    this.categories = [];
    this.colors = AVAILABLE_COLORS;
    this.categoriesControl = new FormControl({disabled: !this.categories.length});
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
    this.subscriptionDB = this.dataBase.getCategories().subscribe(cats => {
      for(let i=0; i<cats.length; i++){
        this.categories.push(cats[i].name);
      }
    });

    this.subscription = this.dataBase.getActivities().subscribe(acts => {
      this.activities = acts;
    });

    this.subscriptionParam = this.route.params.subscribe((param: any) => {
      if ((this.id = param['id']) != null) { // Search the activity by name
        this.subscriptionDB = this.dataBase.getActivity(this.id).subscribe(acts => {
          this.activity = acts;
          this.oldActivity.name = acts.name;
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

  saveActivity() {
    if(okToSave){
      this.activity.name = (((this.activity.name).toLowerCase()).replace(/[\s]{2,}/g," ")).trim();
      if (this.id && this.oldActivity.name != this.activity.name) {
        this.dataBase.deleteActivity(this.oldActivity);
      }
      this.dataBase.saveActivity(this.activity);
      this.router.navigate(["activities"]);
    }
  }

  verifyNameActivity(nameAct){

    nameFound=false;
    okToSave=false;
    //replace(/[\s]{2,}/g," ") => supprime les doubles espaces ou plus
    let actInput = (((this.activity.name).toLowerCase()).replace(/[\s]{2,}/g," ")).trim();
    let actPram = "";
    if (this.id != null) {
      actPram = (((this.id).toLowerCase()).replace(/[\s]{2,}/g," ")).trim();
      actPram.replace(/[\s]{2,}/g," ");
    }

    let newAct=true;
    for(var i=0; i<(this.activities).length; i++){
      let actCompare = (((this.activities[i].name).toLowerCase()).replace(/[\s]{2,}/g," ")).trim();
      if(actCompare == actInput){
        newAct=false;
      }
    }

    if(newAct){
      this.nameFormControl = new FormControl(this.activity.name, [Validators.required, this.existNameValidator]);
      okToSave=true;
    }
    else{
      this.dataBase.getActivity(actInput).subscribe(act => {
        var activityFound = null;
        if(actInput != ""){
          this.nameFormControl = new FormControl(this.activity.name, [Validators.required, this.existNameValidator]);
          activityFound = (this.activity.name).toLowerCase();
          if(actInput == actPram){
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
