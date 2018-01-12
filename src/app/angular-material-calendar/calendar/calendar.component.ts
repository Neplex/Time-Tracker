import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CalendarEvent } from '../calendar-event';
import { Calendar } from '../calendar';

@Component({
  selector: 'mc-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Output() onEventClick = new EventEmitter<CalendarEvent>();

  @Input()
  set events(evs: CalendarEvent[]) {
    this.calendar = new Calendar();
    evs.forEach(e => this.calendar.addEvent(e));
  }

  @Input()
  set date(d: Date) {
    let year = d.getFullYear();
    let month = (d.getMonth() < 9 ? "0" : "") + (d.getMonth() + 1);
    let day = d.getDate();
    const dayElement = document.querySelector(
      "#D" + year + "-" + month + "-" + day
    );
    if (dayElement) { dayElement.scrollIntoView(); }
  }

  public calendar: Calendar;

  constructor() { }

  ngOnInit() {
  }

  eventClick(event: CalendarEvent) {
    this.onEventClick.emit(event);
  }

}
