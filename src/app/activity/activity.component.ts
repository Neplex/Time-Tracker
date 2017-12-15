import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Activity } from '../activity';
import { Category } from '../category';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  private subscriptionParam: Subscription;
  public activity: Activity;
  public categories: Category[];
  public colors: string[];

  public toppings: FormControl;

  constructor(private route: ActivatedRoute) {
    this.activity = new Activity();
    this.categories = CATEGORIES;
    this.colors = COLORS;
    this.toppings = new FormControl();
  }

  ngOnInit() {
    this.subscriptionParam = this.route.params.subscribe((param: any) => {
      // Search the activity by name
        if((param['id'])!=null){ //Recuperer l'activité avec param['id'] quand la base de données sera ok
          this.activity.name = "Activity 0";
          this.activity.description = "description";
          this.activity.color = "green";
          this.activity.addCategory(CATEGORIES[0]);
        }
    });
  }

  // afficherActivity(){
  //   console.log(this.activity);
  // }
  //
  // compareCat(){
  //   console.log(this.activity.getCategories());
  // }
}

// Temporary elements for debug purposes until dataService is available
const CATEGORIES: Category[] = [
  { "name": "Code", "icon": "code" },
  { "name": "Sleep", "icon": "airline_seat_individual_suite" },
  { "name": "Call", "icon": "call" },
  { "name": "Games", "icon": "casino" },
  { "name": "Movies", "icon": "movies" }
]

const COLORS: string[] = [
  "red", "green", "blue"
]
