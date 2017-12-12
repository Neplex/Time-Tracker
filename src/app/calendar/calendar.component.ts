import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Activity } from '../activity';
import { TimeSlot } from '../time-slot';

class CalendarEvent {
  public name: string;
  public color: string;
  private timeSlot: TimeSlot;

  constructor(activity: Activity, timeSlot: TimeSlot) {
    this.name = activity.name;
    this.color = activity.color;
    this.timeSlot = timeSlot;
  }

  getDate(): Date {
    return this.timeSlot.start;
  }

}

class CalendarDay {
  public date: Date;
  public events: CalendarEvent[];

  constructor(date: Date) {
    this.date = date;
    this.events = [];
  }

  addEvent(event: CalendarEvent): void {
    this.events.push(event);
    this.events.sort((e1, e2) => e1.getDate().valueOf() - e2.getDate().valueOf());
  }
}

class CalendarMonth {
  public date: Date;
  public days: CalendarDay[];

  constructor(date: Date) {
    this.date = date;
    this.days = [];
  }

  addEvent(event: CalendarEvent): void {
    // Search day
    let day: CalendarDay = this.days.find(
      d => d.date.getDay() == event.getDate().getDay()
    );

    // If day not exist add new
    if (day == null) {
      day = new CalendarDay(event.getDate());
      this.days.push(day);
      this.days.sort((d1, d2) => d1.date.valueOf() - d2.date.valueOf());
    }

    // Add event to day
    day.addEvent(event);
  }
}

////////////////////////////////////////////////////////////////////////////////
// TODO: acceuil -> ajout rond couleur

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public months: CalendarMonth[];
  public date: Date = new Date();

  constructor() { }

  setDate(event: MatDatepickerInputEvent<Date>) {
    let dayID = "" + event.value.getFullYear() + (event.value.getMonth() + 1) + event.value.getDate();
    // TODO: not working --'
    document.getElementById(dayID).scrollIntoView();
  }

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
    this.months = [];

    // For all time slots in all activity
    for (let i = 0; i < activites.length; i++) {
      let activity = activites[i];

      for (let j = 0; j < activity.getTimeSlots().length; j++) {
        let event = new CalendarEvent(activity, activity.getTimeSlots()[j]);

        // If the month/day exist, append event, else add it
        let month: CalendarMonth = this.months.find(
          m => m.date.getMonth() == event.getDate().getMonth()
        );

        // If day not exist add new
        if (month == null) {
          month = new CalendarMonth(event.getDate());
          this.months.push(month);
          this.months.sort((m1, m2) => m1.date.valueOf() - m2.date.valueOf());
        }

        // Add event to day
        month.addEvent(event);
      }
    }
  }

}
