import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css']
})
export class DateRangePickerComponent implements OnInit {

  @Output() startChange = new EventEmitter<Date>();
  @Output() endChange = new EventEmitter<Date>();

  @Input()
  set start(d: Date) {
    this._start = d;
    this.startChange.emit(d);
  }
  get start(): Date {
    return this._start;
  }

  @Input()
  set end(d: Date) {
    this._end = d;
    this.endChange.emit(d);
  }
  get end(): Date {
    return this._end;
  }

  private _start: Date;
  private _end: Date;

  constructor() { }

  ngOnInit() {
  }

  setDateStart(event: MatDatepickerInputEvent<Date>) {
    this.start = event.value;
    if (this.end == null || this.end < this.start) {
      this.end = this.start;
    }
  }

  setDateEnd(event: MatDatepickerInputEvent<Date>) {
    this.end = event.value;
    if (this.start == null || this.end < this.start) {
      this.start = this.end;
    }
  }

}
