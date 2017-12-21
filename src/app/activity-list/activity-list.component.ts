import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../data-storage/data-storage.service';
import { APP_NAME } from '../global';
import { Activity } from '../activity';
import { Category } from '../category';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {

  @Input() editMode: boolean;
  @Input() set category(category: Category) {
    if (category == null) {
      this.subscription = this.dataBase.getActivities().subscribe(acts => {
        this.activities = acts;
      });
    } else {
      this.subscription = this.dataBase.getActivitiesByCategory(category).subscribe(acts => {
        this.activities = acts;
      });
    }
  }
  @Output() onActivitySelect = new EventEmitter<Activity>();

  public activities: Activity[] = [];
  private subscription: Subscription;

  constructor(private dataBase: DataStorageService) { /* NOTHING TO DO */ }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toogleActivity(act: Activity) {
    this.onActivitySelect.emit(act);
  }

}
