import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
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

  constructor() { }

  ngOnInit() {

    ////////////////////////////////////////////////////////////////////////////
    // Section for debug purpose
    const ACTIVITIES: Activity[] = [];
    let a = new Activity();
    a.name = "Web project";
    a.color = "blue";
    a.addTimeSlot(new TimeSlot(
      new Date("2017-11-23T10:20:00"),
      new Date("2017-11-23T11:34:00")
    ));
    a.addTimeSlot(new TimeSlot(
      new Date("2017-11-24T10:20:00"),
      new Date("2017-11-24T11:34:00")
    ));
    a.addTimeSlot(new TimeSlot(
      new Date("2017-11-26T10:20:00"),
      new Date("2017-11-26T11:34:00")
    ));
    a.addTimeSlot(new TimeSlot(
      new Date("2017-12-08T10:00:00"),
      new Date("2017-12-08T11:00:00")
    ));
    a.addTimeSlot(new TimeSlot(
      new Date("2017-12-08T10:30:00"),
      new Date("2017-12-08T11:30:00")
    ));
    a.addTimeSlot(new TimeSlot(
      new Date("2017-12-08T15:30:00"),
      new Date("2017-12-08T17:30:00")
    ));
    ACTIVITIES.push(a);
    a = new Activity();
    a.name = "Have fun";
    a.color = "teal";
    a.addTimeSlot(new TimeSlot(
      new Date("2017-11-23T12:00:00"),
      new Date("2017-11-23T14:00:00")
    ));
    a.addTimeSlot(new TimeSlot(
      new Date("2017-11-23T16:00:00"),
      new Date("2017-11-23T17:00:00")
    ));
    a.addTimeSlot(new TimeSlot(
      new Date("2017-11-24T23:00:00"),
      new Date("2017-11-25T01:00:00")
    ));
    a.addTimeSlot(new TimeSlot(
      new Date("2017-12-08T08:00:00"),
      new Date("2017-12-08T09:00:00")
    ));
    ACTIVITIES.push(a);
    ////////////////////////////////////////////////////////////////////////////


    let activites: Activity[] = ACTIVITIES;
    activites.forEach(a => {
      a.getTimeSlots().forEach(ts => {
        let event = new CalendarEvent(a.name, ts.start, ts.end, a.color);
        this.events.push(event);
      });
    });
  }

}
