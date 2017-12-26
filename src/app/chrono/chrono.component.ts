import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataStorageService } from '../data-storage/data-storage.service';
import { Activity } from '../activity';

@Component({
  selector: 'app-chrono',
  templateUrl: './chrono.component.html',
  styleUrls: ['./chrono.component.css']
})
export class ChronoComponent implements OnInit {

  @Output() activityChange = new EventEmitter<Activity>();
  @Input()
  set activity(act: Activity) {
    this._activity = act;
    this.toggleActivity(this._activity);
    this.activityChange.emit(this._activity);
  }
  get activity(): Activity {
    return this._activity;
  }

  public time: number = new Date().getTimezoneOffset() * 60000;
  public currentActivity: Activity = null;
  private _activity: Activity = null;

  constructor(private dataBase: DataStorageService) { }

  ngOnInit() {
    setInterval(() => {
      this.time = this.currentActivity != null ? this.currentActivity.getCurrentTime() : 0;
    }, 500);
  }

  ngOnDestroy() {
    this.stopActivity();
  }

  private setCurrentActivity(act: Activity) {
    this._activity = act;
    this.currentActivity = act;
    this.activityChange.emit(this._activity);
  }

  // Stop the active activity
  stopActivity() {
    if (this.activity != null) {
      this.activity.stop();
      this.dataBase.saveActivity(this.currentActivity);
      this.setCurrentActivity(null);
    }
  }

  // Toogle an activity, stop the previous if it running
  toggleActivity(act: Activity) {
    if (act != null) {
      if (this.currentActivity == null) {
        this.setCurrentActivity(act);
        this.currentActivity.start();

      } else {
        this.currentActivity.stop();
        this.dataBase.saveActivity(this.currentActivity);

        if (this.currentActivity != act) {
          this.setCurrentActivity(act);
          this.currentActivity.start();
        } else {
          this.setCurrentActivity(null);
        }
      }
    }
  }

}
