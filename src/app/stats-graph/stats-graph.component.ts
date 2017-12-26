import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../data-storage/data-storage.service';

import { Activity } from '../activity';

@Component({
  selector: 'app-stats-graph',
  templateUrl: './stats-graph.component.html',
  styleUrls: ['./stats-graph.component.css']
})
export class StatsGraphComponent implements OnInit {

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
  private subscriptionCats: Subscription;
  private subscriptionActs: Subscription;

  public labels: string[] = [];
  public data: number[] = [];
  public chartType: string = 'doughnut';
  public colors: any[] = [{
    backgroundColor: [
      "#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4",
      "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107",
      "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B"
    ]
  }];
  public options: any = {
    legend: { position: "right" },
    tooltips: {
      custom: function(data: any) {
        if (data.body) {
          let text: string = data.body[0].lines[0];
          let textSplit: string[] = text.split(" ");
          let time: number = +textSplit[textSplit.length - 1];
          time += new Date().getTimezoneOffset() * 60000;
          let datePipe = new DatePipe("en-US");
          let elapsedTimeStr = datePipe.transform(new Date(time), "HH:mm:ss");//transform date into string as format HH:mm:ss
          text = "";
          for (let i = 0; i < textSplit.length - 1; ++i) { // in case we have a category name with space
            text += textSplit[i] + " ";
          }
          data.body[0].lines[0] = text + elapsedTimeStr;
        }
      }
    }
  };

  public totalTime: number = 0;

  constructor(private dataStorage: DataStorageService) { }

  ngOnInit() {
    this.subscriptionCats = this.dataStorage.getCategories().subscribe(cats => {
      cats.forEach(a => {
        this.labels.push(a.name);
        this.data.push(0);
      });
      this.subscriptionActs = this.dataStorage.getActivities().subscribe(acts => {
        this.activities = acts;
        this.updateDate();
      });
    });
  }

  ngOnDestroy() {
    this.subscriptionCats.unsubscribe();
    this.subscriptionActs.unsubscribe();
  }

  updateDate(): void {
    this.data = [];
    this.totalTime = 0;
    this.labels.forEach(cat => {
      let val = 0;
      this.activities.forEach(act => {
        if (act.hasCategory(cat)) {
          val += act.getTotalTime(this.start, this.end);
        }
      });
      this.data.push(val);
      this.totalTime += val;
    });
    this.totalTime += new Date().getTimezoneOffset() * 60000;
  }

}
