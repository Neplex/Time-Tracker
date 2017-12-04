import { Component, OnInit } from '@angular/core';
import { Activity } from '../activity';
import { Category } from '../category';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {

  public categories: Category[];
  public activities: Activity[];
  public currentActivity: Activity = null;
  public time: Date;

  constructor() { /* NOTHING TO DO */ }

  ngOnInit() {
    this.categories = CATEGORIES;
    this.setCategory(null);

    // Update the time spend on the active activity
    setInterval(() => {
      if (this.currentActivity != null) {
        this.time = new Date(this.currentActivity.getCurrentTime());
      }
    }, 500);
  }

  // Set the current category and update the activities list
  setCategory(category: Category): void {
    this.activities = [];
    for (let i = 0; i < 10; i++) {
      let act: Activity = new Activity();
      act.name = act.description = "Activity " + i;
      this.activities.push(act);
    }
  }

  // Stop the active activity
  stopActivity() {
    if (this.currentActivity != null) {
      this.currentActivity.stop();
      this.currentActivity = null;
    }
  }

  // Toogle an activity, stop the previous if it running
  toogleActivity(activity: Activity) {
    if (this.currentActivity == null) {
      this.currentActivity = activity;
      this.currentActivity.start();

    } else {
      this.currentActivity.stop();

      if (this.currentActivity != activity) {
        this.currentActivity = activity;
        this.currentActivity.start();
      } else {
        this.currentActivity = null;
      }
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
