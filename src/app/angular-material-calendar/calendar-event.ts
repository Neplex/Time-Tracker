export class CalendarEvent {

  constructor(public name: string,
    public startDate: Date = new Date(),
    public endDate: Date = new Date(),
    public cssClass: string = "") { }
}
