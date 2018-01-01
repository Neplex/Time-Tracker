import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.css']
})
export class DateTimePickerComponent implements OnInit {

  @Output() dateTimeChange = new EventEmitter<Date>();

  @Input()
  set dateTime(d: Date) {
    this._date = new Date(d);
    this._hours = this.date.getHours();
    this._minutes = this.date.getMinutes();
  }
  get dateTime(): Date {
    let d = this._date;
    d.setHours(this.hours, this.minutes);
    return d;
  }

  set date(d: Date) {
    this._date = d;
    this.dateTimeChange.emit(this.dateTime);
  }
  get date(): Date { return this._date; }

  set hours(h: number) {
    this._hours = h;
    this.dateTimeChange.emit(this.dateTime);
  }
  get hours(): number { return this._hours; }

  set minutes(m: number) {
    this._minutes = m;
    this.dateTimeChange.emit(this.dateTime);
  }
  get minutes(): number { return this._minutes; }

  private _date: Date;
  private _hours: number;
  private _minutes: number;
  public hoursList: number[] = [];
  public minutesList: number[] = [];

  constructor() {
    for (let i = 0; i < 24; i++) { this.hoursList.push(i); }
    for (let i = 0; i < 60; i++) { this.minutesList.push(i); }
  }

  ngOnInit() {
  }
}
