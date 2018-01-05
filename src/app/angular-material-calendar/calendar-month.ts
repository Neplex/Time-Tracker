import { CalendarEvent } from './calendar-event';
import { CalendarDay } from './calendar-day';

export class CalendarMonth {
  public date: Date;
  public days: CalendarDay[];

  constructor(date: Date) {
    this.date = date;
    this.days = [];
  }

  addEvent(event: CalendarEvent): void {
    // Search day
    let day: CalendarDay = this.days.find(
      d => d.date.getDay() == event.startDate.getDay()
    );

    // If day not exist add new
    if (day == null) {
      day = new CalendarDay(event.startDate);
      this.days.push(day);
      this.days.sort((d1, d2) => d1.date.valueOf() - d2.date.valueOf());
    }

    // Add event to day
    day.addEvent(event);
  }
}
