import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../data-storage/data-storage.service';
import { AVAILABLE_COLORS } from '../global';
import { Activity } from '../activity';
import { Category } from '../category';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  private subscriptionParam: Subscription;
  private subscriptionDB: Subscription;
  public activity: Activity;
  public categories: Category[];
  public colors: string[];
  public id: string;

  public toppings: FormControl;

  constructor(private route: ActivatedRoute, private dataBase: DataStorageService) {
    this.activity = new Activity();
    this.categories = [];
    this.colors = AVAILABLE_COLORS;
    this.toppings = new FormControl();
  }

  ngOnInit() {
    this.subscriptionDB = this.dataBase.getCategories().subscribe(cats => {
      this.categories = cats;
    })

    this.subscriptionParam = this.route.params.subscribe((param: any) => {
      if ((this.id = param['id']) != null) { // Search the activity by name
        this.subscriptionDB = this.dataBase.getActivity(this.id).subscribe(acts => {
          this.activity = acts;
        })
      }
    });
  }

  ngOnDestroy() {
    this.subscriptionParam.unsubscribe();
    this.subscriptionDB.unsubscribe();
  }

  saveActivity() {
    this.dataBase.saveActivity(this.activity);
  }
}
