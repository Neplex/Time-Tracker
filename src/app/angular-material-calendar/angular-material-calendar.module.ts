import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event/event.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarEvent } from './calendar-event';
import { MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule
  ],
  declarations: [EventComponent, CalendarComponent],
  exports: [CalendarComponent]
})
export class AngularMaterialCalendarModule { }
