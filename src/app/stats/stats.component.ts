import { Component, OnInit, ViewChild, NgModule} from '@angular/core';
import { DatePipe } from '@angular/common';

import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

import { Activity } from '../activity';
import { Category } from '../category';
import { TimeSlot } from '../time-slot';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})

export class StatsComponent implements OnInit {

  dateStart :Date = null; //start Date
  dateEnd :Date = null; //end Date

  totalTime : number= 0; //total time spent in millisecondes

  pageSize = 10; //number activities per page
  pagePaginator = [5,10,20]; //paginator sizes
  displayedCols = ["name","time"]; //displayed column names


  categories: Category[] = []; //categories
  activitiesInInterval: Activity[] = []; //activities that must be shown in the page
  allActivities: Activity[] = []; //all activities


  dataSource:MatTableDataSource<Activity> = null; //datasource for the page
  @ViewChild(MatPaginator) paginator: MatPaginator; //paginator
  @ViewChild(MatSort) sort: MatSort; // displaying


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  chartLabels:string[] = []; //labels for the donuts charts (the categories name)
  categoriesData:number[] = []; // list of the total time spend for each categoris
  chartType:string = 'doughnut'; //the chart type
  chartOptions : any = {
    legend : {
      position : "right",
    },
    tooltips : {
      custom: function(data:any) {
        if(data.body) {
          console.log(data);
          data.width = 150; //tooltip length
          let text:string = data.body[0].lines[0];
          let textSplit: string[] = text.split(" ");
          let time :number = +textSplit[1];
          let datePipe = new DatePipe("en-US");
          let affiche = datePipe.transform(new Date(time), "HH:mm:ss");
          data.body[0].lines[0] = "Durée total : "+affiche;
        }
      },
    }
  };

  constructor() { }

  ngOnInit() {

    /**********tests**********/


    //creating activities

    let c = new Category();
    c.name = "development"
    this.categories.push(c);
    let a = new Activity();
    a.name = "Web project";
    a.color = "blue";
    a.addCategory (c);
    a.description = "Working on web project"
    a.addTimeSlot(new TimeSlot(
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
    ));
    this.allActivities.push(a);
    c = new Category();
    c.name = "relax";
    a = new Activity();
    a.name = "Have fun";
    a.color = "teal";
    a.addCategory(c);
    a.description = "Relaxing with good vibes";
    this.categories.push(c);

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
    ));

    this.allActivities.push(a);
    c = new Category();
    c.name = "sport";
    a = new Activity();
    a.name = "badminton";
    a.color = "blue";
    a.addCategory(c);
    a.description = "Playing with main gauche";
    a.addTimeSlot(new TimeSlot(
      new Date("2017-12-15T18:00:00"),
      new Date("2017-12-15T20:00:00")
    ));
    this.categories.push(c);
    this.allActivities.push(a);
    this.activitiesInInterval = this.allActivities;
    this.dataSource = new MatTableDataSource<Activity>(this.activitiesInInterval);
    this.setDonuts();
  }

  //return time for an activity
  getTempsActivity(activity:Activity): number {
    return activity.getTotalTime(this.dateStart,this.dateEnd);
  }

  //to filter the activities in the table
  filterTable(value:string) {
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  //update the chart and the display of activities
  update() {
    let activity: Activity = null;
    this.activitiesInInterval = [];
    for(let i=0; i < this.allActivities.length;++i) {
      activity = this.allActivities[i];
      if(this.getTempsActivity(activity) > 0) {
        this.activitiesInInterval.push(activity);
      }
    }
    this.dataSource = new MatTableDataSource<Activity>(this.activitiesInInterval);
    this.setDonuts();
  }

  //get the total Time
  calculTotalTime() : number {
    this.totalTime = 0;
    for(let i = 0; i < this.activitiesInInterval.length;++i) {
      this.totalTime += this.activitiesInInterval[i].getTotalTime(this.dateStart,this.dateEnd);
    }
    return this.totalTime;
  }

//set the start date
  setDateStart(event: MatDatepickerInputEvent<Date>) {
    this.dateStart = event.value;
    if(this.dateEnd == null || this.dateEnd < this.dateStart ) {
        this.dateEnd = this.dateStart;
    }
    this.update();
  }

//set the end date
  setDateEnd(event: MatDatepickerInputEvent<Date>) {
    this.dateEnd = event.value;
    if(this.dateStart == null || this.dateEnd < this.dateStart) {
        this.dateStart = this.dateEnd;
    }
    this.update();
  }


  //set the charts datas
  setDonuts() {
    let val:number = null;
    let curretCategory:Category = null;
    let activity : Activity = null;
    this.chartLabels = [];
    this.categoriesData = [];
    let times_slot : TimeSlot[] = [];
    for(let i = 0; i< this.categories.length;++i) {
      curretCategory = this.categories[i];
      val = 0;
      for(let j = 0; j < this.activitiesInInterval.length;++j) {
        activity = this.activitiesInInterval[j];
        if(activity.hasCategory(curretCategory.name))  {
          val += activity.getTotalTime(this.dateStart, this.dateEnd);
        }
      }
      this.categoriesData.push(val);
      this.chartLabels.push(curretCategory.name);
    }
  }
  //may use this function to show on the table the activities of the selected category
  chartClick(event:any) : void {
    if(event.active.length != 0) {
      //fi
    }
  }
}
