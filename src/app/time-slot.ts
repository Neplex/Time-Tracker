export class TimeSlot {

  public start: Date;
  public end: Date;

  constructor(start: Date, end: Date) {
    this.start = start;
    this.end = end;
  }

  // Get elapsed time
  elapsedTime(): number {
    return this.end.getTime() - this.start.getTime();
  }

}
