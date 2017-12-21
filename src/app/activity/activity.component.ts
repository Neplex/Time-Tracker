import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../data-storage/data-storage.service';
import { AVAILABLE_COLORS } from '../global';
import { Activity } from '../activity';
import { Category } from '../category';

import { AbstractControl } from '@angular/forms';

let nameFound: boolean = false;

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  private subscriptionParam: Subscription;
  private subscriptionDB: Subscription;
  public activity: Activity;
  public categories: Category[];
  public colors: string[];
  public id: string;

  public toppings: FormControl;

  private nameFormControl: FormControl;

  constructor(private route: ActivatedRoute, private dataBase: DataStorageService) {
    this.activity = new Activity();
    this.categories = [];
    this.colors = AVAILABLE_COLORS;
    this.toppings = new FormControl();
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
      this.categories = cats;
    });

    this.subscriptionParam = this.route.params.subscribe((param: any) => {
      if ((this.id = param['id']) != null) { // Search the activity by name
        this.subscriptionDB = this.dataBase.getActivity(this.id).subscribe(acts => {
          this.activity = acts;
        })
      }
    });
  }

  ngOnDestroy() {
    this.subscriptionParam.unsubscribe();
    this.subscriptionDB.unsubscribe();
  }

  saveActivity() {
    if (this.id != null) {
      //this.dataBase.deleteActivity(this.activity);
    }
    this.dataBase.saveActivity(this.activity);
    window.location.replace("activities");
  }

  verifyNameActivity(nameAct){
    nameFound=false;
    //replace(/[\s]{2,}/g," ") => supprime les doubles espaces ou plus
    let actInput = (((this.activity.name).toLowerCase()).replace(/[\s]{2,}/g," ")).trim();
    console.log(actInput);
    let actPram = "";
    if (this.id != null) {
      actPram = (((this.id).toLowerCase()).replace(/[\s]{2,}/g," ")).trim();
      actPram.replace(/[\s]{2,}/g," ");
      console.log(actPram);
    }
    // il faut que les activités enregistrés soient en minuscules
    this.dataBase.getActivity(actInput).subscribe(act => {
      var activityFound = null;
      if(act == null){
        console.log("act null");
      }
      else {
        if(actInput != ""){
          if(actInput == actPram){ // ok to edit the same activity
            console.log("same activity");
            activityFound = (this.activity.name).toLowerCase();
            // this.saveActivity();
          }
          else{
            activityFound = (this.activity.name).toLowerCase();
            console.log("activityFound "+activityFound);
            nameFound=true;
            console.log("activity already exist");
            console.log(this.activity.name);

            this.nameFormControl = new FormControl(this.activity.name, [
              Validators.required,
              this.existNameValidator
            ]);
          }
          // a partir d'ici, c est normal que ca marche pas, pour l'instant
          // save new activity
          if(activityFound == null){
            // Activity 10
            // pas mis en jour tout de suite a revoir
            console.log("activity not exist");
            // this.saveActivity();
          }
        }
      }
    });

  }

}
