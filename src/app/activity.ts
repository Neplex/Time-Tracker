import { Category } from './category';
import { TimeSlot } from './time-slot';

export class Activity {
  name: string;
  description: string;
  color: string;
  categories: Category[];
  time_slots: TimeSlot[];
}
