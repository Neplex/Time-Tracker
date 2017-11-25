import { Component, OnInit } from '@angular/core';
import { Activity } from '../activity';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  activities: Activity[] = [
    { "name": "Activity 1", "description": "Activity 1", "color": "blue", "categories": [], "time_slots": [] },
    { "name": "Activity 2", "description": "Activity 2", "color": "blue", "categories": [], "time_slots": [] },
    { "name": "Activity 3", "description": "Activity 3", "color": "blue", "categories": [], "time_slots": [] },
    { "name": "Activity 4", "description": "Activity 4", "color": "blue", "categories": [], "time_slots": [] },
    { "name": "Activity 5", "description": "Activity 5", "color": "blue", "categories": [], "time_slots": [] }
  ]
}
