import { Component, OnInit, ViewChild } from '@angular/core';
import { Activity } from '../activity';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { Category } from '../category';
import { TimeSlot } from '../time-slot';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  /*Prepare table*/
  pageSize = 10;
  pagePaginator = [5,10,20];
  displayedCols = ["name","elapse"];
  categories: Category[] = [];
  acvitivies: Activity[] = [];
  dataSource:MatTableDataSource<Activity> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor() { }

  ngOnInit() {

    /**********tests**********/


    //creating acvitivies

    let c = new Category();
    c.name = "development"
    this.categories.push(c);

    let a = new Activity();
    a.name = "Web project";
    a.color = "blue";
    a.addCategory (c);
    a.description = "Working on web project"
    /*a.addTimeSlot(new TimeSlot(
      new Date("2017-11-23T10:20:00"),
      new Date("2017-11-23T11:34:00")
    ));

    a.addTimeSlot(new TimeSlot(
      new Date("2017-11-24T10:20:00"),
      new Date("2017-11-24T11:34:00")
    ));
    a.addTimeSlot(new TimeSlot(
      new Date("2017-11-26T10:20:00"),
      new Date("2017-11-26T11:34:00")
    ));
    a.addTimeSlot(new TimeSlot(
      new Date("2017-12-08T10:00:00"),
      new Date("2017-12-08T11:00:00")
    ));
    a.addTimeSlot(new TimeSlot(
      new Date("2017-12-08T10:30:00"),
      new Date("2017-12-08T11:30:00")
    ));
    a.addTimeSlot(new TimeSlot(
      new Date("2017-12-08T15:30:00"),
      new Date("2017-12-08T17:30:00")
    ));*/
    this.acvitivies.push(a);
    c = new Category();
    c.name = "relax";
    a = new Activity();
    a.name = "Have fun";
    a.color = "teal";
    a.addCategory(c);
    a.description = "Relaxing with good vibes";
    this.categories.push(c);
    /*
    a.addTimeSlot(new TimeSlot(
      new Date("2017-11-23T12:00:00"),
      new Date("2017-11-23T14:00:00")
    ));
    a.addTimeSlot(new TimeSlot(
      new Date("2017-11-23T16:00:00"),
      new Date("2017-11-23T17:00:00")
    ));
    a.addTimeSlot(new TimeSlot(
      new Date("2017-11-24T23:00:00"),
      new Date("2017-11-25T01:00:00")
    ));
    a.addTimeSlot(new TimeSlot(
      new Date("2017-12-08T08:00:00"),
      new Date("2017-12-08T09:00:00")
    ));*/
    this.acvitivies.push(a);
    c = new Category();
    c.name = "sport";
    a = new Activity();
    a.name = "badminton";
    a.color = "blue";
    a.addCategory(c);
    a.description = "Playing with main gauche";
    this.categories.push(c);
    this.acvitivies.push(a);
    console.log("HEY");
    for( let i = 0; i < 25; ++i) {
      this.acvitivies.push(a);
    }
    this.dataSource = new MatTableDataSource<Activity>(this.acvitivies);

    //
  }

  calculTemps(activity:Activity): string {
    return "Je dois calculer le time ICI ";
  }

  filterTable(value:string) {
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

}
