import { Component, OnInit, ViewChild, NgModule} from '@angular/core';
import { DatePipe } from '@angular/common';

import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

import { Activity } from '../activity';
import { Category } from '../category';
import { TimeSlot } from '../time-slot';

import {DataStorageService} from '../data-storage/data-storage.service';
import { Subscription } from 'rxjs';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})

export class StatsComponent implements OnInit {

  private subscriptionActivities: Subscription;
  private subscriptionCategories: Subscription;
  private dateStart :Date = null; //start Date
  private dateEnd :Date = null; //end Date

  private totalTime : number= 0; //total time spent in millisecondes

  private pageSize = 10; //number activities per page
  private pagePaginator = [5,10,20,50]; //paginator sizes
  private displayedCols = ["name","time"]; //displayed column names


  private activitiesInInterval: Activity[] = []; //activities that must be shown on the page
  private allActivities: Activity[] = []; //all activities


  private dataSource:MatTableDataSource<Activity> = null; //datasource for the page
  @ViewChild(MatPaginator) paginator: MatPaginator; //paginator
  @ViewChild(MatSort) sort: MatSort; // displaying
  @ViewChild('myChart') chart: BaseChartDirective;


  private chartLabels:string[] = []; //labels for the donuts charts (the categories name)
  private categoriesData:number[] = []; // list of the total time spend for each category
  private chartType:string = 'doughnut'; //the chart type
  private chartColors: any[] = [ //Donut's colors
                                          // ionk to colors http://www.color-hex.com
                                      { backgroundColor: [
                                      "#20b2aa",
                                      "#f08080",
                                      "#fa8072",
                                      "#ff7373",
                                      "#40e0d0",
                                      "#7fffd4",
                                      "#0f85fe",
                                      "#bd6416",
                                      "#fdb103",
                                      "#2d8c9e",
                                      "#d28240",
                                      "#8e0d0d",
                                      "#d89840",
                                      "#00ffd2",
                                      "#ff9a00",
                                      "#ffc100",
                                      "#ff9800",
                                      "#e0d6db",
                                      "#c8ae98",
                                      "#008080",
                                      "#ffc0cb",
                                      "#ffffff",
                                      "#000000",
                                      "#ff0000",
                                      "#002600",
                                      "#709330",
                                      "#0d5330",
                                      "#e7f2ff",
                                      "#fdaf27",
                                      "#e7f2ff",
                                      "#f9edf5",
                                      "#e0d6db",
                                      "#f2e2e5",
                                      "#008080",
                                      "#900c3f",
                                      "#fdaf27",
                                      "#0d5330",
                                      "#c37257",
                                      "#748589",
                                      "#55895a",
                                      "#aa9588",
                                      ] }];
  private chartOptions : any = {
      legend : {
        position : "right",
      },
      tooltips : {
        custom: function(data:any) {
          if(data.body) {
            let text:string = data.body[0].lines[0];
            let textSplit: string[] = text.split(" ");
            let time :number = +textSplit[textSplit.length-1];
            let datePipe = new DatePipe("en-US");
            let elapsedTimeStr = datePipe.transform(new Date(time), "HH:mm:ss");//transform date into string as format HH:mm:ss
            text = "";
            for(let i=0; i < textSplit.length-1;++i) { // in case we have a category name with space
              text += textSplit[i] + " ";
            }
            data.body[0].lines[0] =text+elapsedTimeStr;
          }
        },
      }
    };

  constructor(private dataStorage: DataStorageService) { }

  ngOnInit() {
    this.update();
    this.subscriptionActivities = this.dataStorage.getActivities().subscribe(acts =>
    {
      for(let i = 0;i<acts.length;++i) {
        this.allActivities.push(acts[i]);
        this.activitiesInInterval.push(acts[i]);
      }
      if(this.chartLabels.length != 0) { //update the chart if categories are already selected
        this.update();
      }
    });
    this.subscriptionCategories = this.dataStorage.getCategories().subscribe(acts =>
    {
      for(let i = 0;i<acts.length;++i) {
        this.chartLabels.push(acts[i].name);
      }
      if(this.allActivities.length != 0) { //update the chart if activities are already selected
        this.update();
      }
    });
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
    this.activitiesInInterval.length = 0;
    for(let i=0; i < this.allActivities.length;++i) {
      activity = this.allActivities[i];
      if(this.getTempsActivity(activity) > 0) {
        this.activitiesInInterval.push(activity);
      }
    }
    this.dataSource = new MatTableDataSource<Activity>(this.activitiesInInterval);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.calculTotalTime();
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
    let val:number = 0;
    let curretCategory:string = "";
    let activity : Activity = null;
    this.categoriesData = [];
    for(let i = 0; i< this.chartLabels.length;++i) {
      curretCategory = this.chartLabels[i];
      for(let j = 0; j < this.activitiesInInterval.length;++j) {
        activity = this.activitiesInInterval[j];
        if(activity.hasCategory(curretCategory))  {
          val += activity.getTotalTime(this.dateStart, this.dateEnd);
        }
      }
      this.categoriesData.push(val);
      val = 0;
    }
  }

  ngOnDestroy() {
    this.subscriptionActivities.unsubscribe();
    this.subscriptionCategories.unsubscribe();
  }

}
