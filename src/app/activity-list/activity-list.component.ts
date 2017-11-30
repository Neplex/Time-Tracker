import { Component, OnInit } from '@angular/core';
import { Activity } from '../activity';
import { Category } from '../category';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  categoryFilter: Category = null;
  categories: Category[] = CATEGORIES;
  activities: Activity[] = ACTIVITIES;

  setCategory(category: Category) {
    this.categoryFilter = category;
    if (this.categoryFilter != null) {
      this.activities = [];
      for (let i = 0; i < ACTIVITIES.length; i++) {
        if (ACTIVITIES[i].categories.indexOf(this.categoryFilter) > -1) {
          this.activities.push(ACTIVITIES[i]);
        }
      }
    } else {
      this.activities = ACTIVITIES;
    }
  }
}

const CATEGORIES: Category[] = [
  { "name": "Code", "icon": "code" },
  { "name": "Sleep", "icon": "airline_seat_individual_suite" },
  { "name": "Call", "icon": "call" },
  { "name": "Games", "icon": "casino" },
  { "name": "Movies", "icon": "movies" }
]

const ACTIVITIES: Activity[] = [
  { "name": "Activity 1", "description": "Activity 1", "color": "blue", "categories": [CATEGORIES[0], CATEGORIES[1]], "time_slots": [] },
  { "name": "Activity 2", "description": "Activity 2", "color": "blue", "categories": [CATEGORIES[0]], "time_slots": [] },
  { "name": "Activity 3", "description": "Activity 3", "color": "blue", "categories": [CATEGORIES[0]], "time_slots": [] },
  { "name": "Activity 4", "description": "Activity 4", "color": "blue", "categories": [CATEGORIES[3], CATEGORIES[4]], "time_slots": [] },
  { "name": "Activity 5", "description": "Activity 5", "color": "blue", "categories": [CATEGORIES[3]], "time_slots": [] }
]
