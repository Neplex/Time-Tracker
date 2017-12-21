import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
    this.toogleActivity(this._activity);
    this.activityChange.emit(this._activity);
  }
  get activity(): Activity {
    return this._activity;
  }

  public time: number;
  public currentActivity: Activity = null;
  private _activity: Activity;

  constructor() { }

  ngOnInit() {
  }

  // Stop the active activity
  stopActivity() {
    if (this.currentActivity != null) {
      this.currentActivity.stop();
      this.activity = null;
    }
  }

  // Toogle an activity, stop the previous if it running
  toogleActivity(activity: Activity) {
    if (activity != null) {
      if (this.currentActivity == null) {
        this.currentActivity = activity;
        this.currentActivity.start();

      } else {
        this.currentActivity.stop();

        if (this.currentActivity != activity) {
          this.currentActivity = activity;
          this.currentActivity.start();
        } else {
          this.activity = null;
        }
      }
    }
  }

}
