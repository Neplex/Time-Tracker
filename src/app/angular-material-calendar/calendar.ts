import { CalendarEvent } from './calendar-event';
import { CalendarMonth } from './calendar-month';

export class Calendar {
  public months: CalendarMonth[];

  constructor() {
    this.months = [];
  }

  addEvent(event: CalendarEvent): void {
    // Search month
    let month: CalendarMonth = this.months.find(
      m => m.date.getMonth() == event.startDate.getMonth()
    );

    // If month not exist add new
    if (month == null) {
      month = new CalendarMonth(event.startDate);
      this.months.push(month);
      this.months.sort((m1, m2) => m1.date.valueOf() - m2.date.valueOf());
    }

    // Add event to month
    month.addEvent(event);
  }
}
