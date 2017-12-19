import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
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
  /*Prepare table*/
  dateStart :Date = null;
  dateEnd :Date = null;

  dureeTotal : number= 0;

  pageSize = 10;
  pagePaginator = [5,10,20];
  displayedCols = ["name","time"];


  categories: Category[] = [];
  activitiesInInterval: Activity[] = [];
  allActivities: Activity[] = [];


  dataSource:MatTableDataSource<Activity> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  chartLabels:string[] = [];
  categoriesData:number[] = [];
  chartType:string = 'doughnut';

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

  calculTemps(activity:Activity): number {
    let elapsed_time : number  = 0;
    let times_slots : TimeSlot[] = activity.getTimeSlots();
    for(let i = 0; i< times_slots.length;++i) {
      if(this.dateStart == null || (this.dateStart.getTime() <= times_slots[i].start.getTime() && times_slots[i].start.getTime() <= this.dateEnd.getTime() )) {
        elapsed_time+= times_slots[i].elapsedTime();
      }
        //gérer ici cas où la date de fin de l'activité est supérieur à la date de fin choisi
    }
    return elapsed_time;
  }

  filterTable(value:string) {
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  update() {
    let activity: Activity = null;
    this.activitiesInInterval = [];
    for(let i=0; i < this.allActivities.length;++i) {
      activity = this.allActivities[i];
      if(this.calculTemps(activity) > 0) {
        this.activitiesInInterval.push(activity);
      }
    }
    this.dataSource = new MatTableDataSource<Activity>(this.activitiesInInterval);
    this.setDonuts();
  }

  calculDureeTotal() : number {
    this.dureeTotal = 0;
    for(let i = 0; i < this.activitiesInInterval.length;++i) {
      this.dureeTotal += this.calculTemps(this.activitiesInInterval[i]);
    }
    return this.dureeTotal;
  }

  setDateStart(event: MatDatepickerInputEvent<Date>) {
    this.dateStart = event.value;
    if(this.dateEnd == null || this.dateEnd < this.dateStart ) {
        this.dateEnd = this.dateStart;
    }
    this.update();
  }

  setDateEnd(event: MatDatepickerInputEvent<Date>) {
    this.dateEnd = event.value;
    if(this.dateStart == null || this.dateEnd < this.dateStart) {
        this.dateStart = this.dateEnd;
    }
    this.update();
  }

  setDonuts() {
    let val:number = null;
    let curretCategory:string = null;
    let activity : Activity = null;
    this.chartLabels = [];
    this.categoriesData = [];
    let times_slot : TimeSlot[] = [];
    for(let i = 0; i< this.categories.length;++i) {
      curretCategory = this.categories[i].name;
      val = 0;
      for(let j = 0; j < this.activitiesInInterval.length;++j) {
        activity = this.activitiesInInterval[i];
        if(curretCategory in activity.getCategories()))  {
          times_slot = activity.getTimeSlots();
          for(let k = 0; k < times_slot.length; ++k) {
            val += times_slot[k].elapsedTime();
          }
        }
        console.log(val);
      }
      this.categoriesData.push(val);
      this.chartLabels.push(curretCategory);
    }
    console.log(this.chartLabels);
    console.log(this.categoriesData);
  }
}
