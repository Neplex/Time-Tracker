import { Category } from './category';
import { TimeSlot } from './time-slot';

export class Activity {

  public name: string = null;          // The name of activity
  public description: string = null;   // The description
  public color: string = null;         // The color for display

  private categories: string[] = []; // List of categories
  private time_slots: TimeSlot[] = []; // List of time slots
  private start_date: Date = null;     // Start date of the current time slot

  // Add a new category
  addCategory(ct: string): void { this.categories.push(ct); }

  // Get all categories
  getCategories(): string[] { return this.categories; }

  // Add time slots
  addTimeSlot(ts: TimeSlot): void { this.time_slots.push(ts); }

  // Get all time slots
  getTimeSlots(): TimeSlot[] { return this.time_slots; }

  // Get total time spend on activity between two dates
  getTotalTime(startDate: Date, endDate: Date): number {
  let d1 = new Date(startDate);
  let d2 = new Date(endDate);
  let elapsedTime = 0;
  d2.setDate(d2.getDate()+1);
  let start : Date = null;
  let end : Date = null;
  for(let i =0; i < this.time_slots.length;++i) {
    start = this.time_slots[i].start;
    end = this.time_slots[i].end;
    if(startDate == null || (d1.getTime() <=start.getTime() && start.getTime() <= d2.getTime()) ) {
      elapsedTime += this.time_slots[i].elapsedTime();
      if( endDate != null && d2.getTime() < end.getTime()) {
        elapsedTime -= end.getTime()-d2.getTime();
      }
    }
  }
  return elapsedTime;
}

  // Get time spend on activity durring the current time slot
  getCurrentTime(): number {
    return this.start_date != null ? new TimeSlot(this.start_date, new Date()).elapsedTime() : 0;
  }

  // Start a new time slot
  start(): void {
    if (this.start_date == null) {
      this.start_date = new Date();
    }
  }

  // Finish the current time slot
  stop(): TimeSlot {
    let ts: TimeSlot = null;
    if (this.start_date) {
      ts = new TimeSlot(this.start_date, new Date());
      this.addTimeSlot(ts);
      this.start_date = null;
    }
    return ts;
  }

  //return true if the activity is in the category
  hasCategory(name:String) : boolean {
    for(let i = 0; i < this.categories.length;++i) {
      if(name == this.categories[i].name) {
        return true;
      }
      return false;
    }
  }

}
