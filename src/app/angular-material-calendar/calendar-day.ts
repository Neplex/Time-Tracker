import { CalendarEvent } from './calendar-event';

export class CalendarDay {
  public date: Date;
  public events: CalendarEvent[];

  constructor(date: Date) {
    this.date = date;
    this.events = [];
  }

  addEvent(event: CalendarEvent): void {
    this.events.push(event);
    this.events.sort((e1, e2) => e1.startDate.valueOf() - e2.startDate.valueOf());
  }
}
