import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../data-storage/data-storage.service';
import { Activity } from '../activity';
import { TimeSlot } from '../time-slot';
import { CalendarEvent } from '../angular-material-calendar/calendar-event';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public date: Date = new Date();
  public events: CalendarEvent[] = [];
  private subscription: Subscription;

  constructor(private router: Router, private dataBase: DataStorageService) { }

  ngOnInit() {

    this.subscription = this.dataBase.getActivities().subscribe(acts => {
      let tab = [];
      acts.forEach(a => {
        a.getTimeSlots().forEach((ts, i) => {
          let event = new CalendarEvent(a.name, ts.start, ts.end, a.color);
          event.data = { activity: a, ts: i };
          tab.push(event);
        });
      });
      this.events = tab;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setToday(): void {
    this.date = new Date();
  }

  goToEvent(event: CalendarEvent) {
    this.router.navigate([
      "/activities", event.data.activity.name, "time-slots", event.data.ts
    ]);
  }

}
