import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent } from '../calendar-event';
import { Calendar } from '../calendar';

@Component({
  selector: 'mc-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Input('events') events: CalendarEvent[] = [];
  public calendar: Calendar;

  constructor() {
    this.calendar = new Calendar();
  }

  ngOnInit() {
    this.events.forEach(e => this.calendar.addEvent(e));
  }

}
