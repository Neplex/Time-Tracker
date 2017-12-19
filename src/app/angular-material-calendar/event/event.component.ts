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

}
