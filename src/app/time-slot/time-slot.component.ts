import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../data-storage/data-storage.service';
import { Activity } from '../activity';

@Component({
  selector: 'app-time-slot',
  templateUrl: './time-slot.component.html',
  styleUrls: ['./time-slot.component.css']
})
export class TimeSlotComponent implements OnInit {

  private subscriptionParam: Subscription;
  private subscriptionDB: Subscription;
  private id;
  private ts;

  public activity: Activity = new Activity();
  public startDate: Date;
  public endDate: Date;

  constructor(private router: Router, private route: ActivatedRoute, private dataBase: DataStorageService) { }

  ngOnInit() {
    this.subscriptionParam = this.route.params.subscribe((param: any) => {
      this.id = param['id'];
      this.ts = param['ts'];

      this.subscriptionDB = this.dataBase.getActivity(this.id).subscribe(act => {
        this.activity = act;

        if (this.activity == null || this.ts < 0 || this.ts >= this.activity.getTimeSlots().length) {
          this.router.navigate(["/"]);
        }

        let time = this.activity.getTimeSlots()[this.ts];
        this.startDate = time.start;
        this.endDate = time.end;
      });
    });
  }

  ngOnDestroy() {
    this.subscriptionParam.unsubscribe();
    if (this.subscriptionDB) {
      this.subscriptionDB.unsubscribe();
    }
  }

  save() {
    this.activity.getTimeSlots()[this.ts].start = this.startDate;
    this.activity.getTimeSlots()[this.ts].end = this.endDate;
    this.dataBase.saveActivity(this.activity);
    this.router.navigate(["/calendar"]);
  }

  dateStartChange() {
    if (this.startDate > this.endDate) {
      this.endDate = this.startDate;
    }
  }

  dateEndChange() {
    if (this.endDate < this.startDate) {
      this.startDate = this.endDate;
    }
  }

}
