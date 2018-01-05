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
    const dayElement = document.querySelector(
      "#D" + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
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
