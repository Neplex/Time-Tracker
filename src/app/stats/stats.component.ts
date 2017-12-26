import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})

export class StatsComponent implements OnInit {

  public dateStart: Date;
  public dateEnd: Date;

  constructor() {
    this.dateStart = new Date();
    this.dateStart.setHours(0, 0, 0, 0);
    this.dateEnd = new Date();
  }

  ngOnInit() {
  }

}
