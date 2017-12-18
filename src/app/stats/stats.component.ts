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
  }

  //calcul le temps pour chaque activity
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

  //méthode de filtre pour la table
  filterTable(value:string) {
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

/*

*/

  upDate() {
    let activity: Activity = null;
    this.activitiesInInterval = [];
    for(let i=0; i < this.allActivities.length;++i) {
      activity = this.allActivities[i];
      if(this.calculTemps(activity) > 0) {
        this.activitiesInInterval.push(activity);
      }
    }
    this.dataSource = new MatTableDataSource<Activity>(this.activitiesInInterval);
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
    this.upDate();
  }

  setDateEnd(event: MatDatepickerInputEvent<Date>) {
    this.dateEnd = event.value;
    if(this.dateStart == null || this.dateEnd < this.dateStart) {
        this.dateStart = this.dateEnd;
    }
    this.upDate();
  }
