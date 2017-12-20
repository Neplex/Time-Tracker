import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Activity } from '../activity';

@Component({
  selector: 'app-activity-list-item',
  templateUrl: './activity-list-item.component.html',
  styleUrls: ['./activity-list-item.component.css']
})
export class ActivityListItemComponent implements OnInit {

  @Input() activity: Activity;
  @Input() editMode: boolean;
  @Output('toogleActivity') onActivitySelect = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  toogleActivity() {
    this.onActivitySelect.emit();
  }

}
