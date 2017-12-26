import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../data-storage/data-storage.service';

import { Activity } from '../activity';

@Component({
  selector: 'app-stats-activity-list',
  templateUrl: './stats-activity-list.component.html',
  styleUrls: ['./stats-activity-list.component.css']
})
export class StatsActivityListComponent implements OnInit {

  @Input()
  set start(d: Date) {
    this._start = d;
    this.updateDate();
  }
  get start(): Date {
    return this._start;
  }

  @Input()
  set end(d: Date) {
    this._end = d;
    this.updateDate();
  }
  get end(): Date {
    return this._end;
  }

  private _start: Date;
  private _end: Date;
  private activities: Activity[] = [];
  private subscription: Subscription;

  private pageSize = 20;
  private pagePaginator = [10, 20, 50];
  private displayedCols = ["name", "time"];

  private dataSource: MatTableDataSource<Activity> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataStorage: DataStorageService) {
    this.dataSource = new MatTableDataSource<Activity>();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.subscription = this.dataStorage.getActivities().subscribe(acts => {
      this.activities = acts;
      this.updateDate();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getActivityTime(act: Activity): number {
    return act.getTotalTime(this.start, this.end) + new Date().getTimezoneOffset() * 60000;
  }

  filterTable(value: string) {
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  updateDate(): void {
    let acts = [];
    this.activities.forEach(act => {
      if (act.getTotalTime(this.start, this.end) > 0) {
        acts.push(act);
      }
    })
    this.dataSource.data = acts;
  }

}
