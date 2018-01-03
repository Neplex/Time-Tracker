import { Component, OnInit } from '@angular/core';
import { APP_NAME } from '../global';
import { Activity } from '../activity';
import { Category } from '../category';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public currentCategory: Category = null;
  public currentActivity: Activity = null;
  public app_name: string = APP_NAME;
  public editMode: boolean = false;
  public searchText: string;

  constructor() { /* NOTHING TO DO */ }

  ngOnInit() {

  }
}
