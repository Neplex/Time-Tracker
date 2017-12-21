import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent } from '../calendar-event';

@Component({
  selector: 'mc-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  @Input() event: CalendarEvent;

  constructor() { }

  ngOnInit() {
  }

  getTime() {
    let gmt = this.event.startDate.getTimezoneOffset() * 60000;
    return this.event.endDate.getTime() - this.event.startDate.getTime() + gmt;
  }

}
