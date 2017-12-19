import { Component, OnInit } from '@angular/core';
import { APP_NAME } from '../global';
import { Activity } from '../activity';
import { Category } from '../category';
import { DataStorageService } from '../data-storage/data-storage.service';
import { Subscription } from 'rxjs';

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
  public app_name: string = APP_NAME;
  public editMode: boolean = false;

  constructor(private dataBase: DataStorageService) { /* NOTHING TO DO */ }

  ngOnInit() {
    this.categories = [];
    this.setCategory(null);

    // Update the time spend on the active activity
    setInterval(() => {
      if (this.currentActivity != null) {
        this.time = new Date(this.currentActivity.getCurrentTime());
      }
    }, 500);

    // Récupération des activités de la BDD. Async, une liste vide sera affichée puis rempli une fois la requète terminée.
    let actsSub = this.dataBase.getActivities().subscribe((acts) => {
      this.activities = acts;
    },null,() =>{
      actsSub.unsubscribe();
    });
  }

  // Set the current category and update the activities list
  setCategory(category: Category): void {
    this.activities = [];
    // for (let i = 0; i < 10; i++) {
    //   let act: Activity = new Activity();
    //   act.name = act.description = "Activity " + i;
    //   act.color = "blue";
    //   this.activities.push(act);
    // }
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

  toogleEditMode() {
    this.editMode = !this.editMode;
  }
}

const CATEGORIES: Category[] = [
  { "name": "Code", "icon": "code" },
  { "name": "Sleep", "icon": "airline_seat_individual_suite" },
  { "name": "Call", "icon": "call" },
  { "name": "Games", "icon": "casino" },
  { "name": "Movies", "icon": "movies" }
]
