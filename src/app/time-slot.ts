export class TimeSlot {

  public start: Date;
  public end: Date;

  constructor(start: Date, end: Date) {
    this.start = start;
    this.end = end;
  }

  // Get elapsed time
  elapsedTime(): number {
    let gmt = this.end.getTimezoneOffset() * 60000;
    return this.end.getTime() - this.start.getTime() + gmt;
  }
}
