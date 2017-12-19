import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../data-storage/data-storage.service';
import { Category } from '../category';
import { AVAILABLE_ICONS } from '../global';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  private subscriptionParam: Subscription;
  private subscriptionDB: Subscription;
  public category: Category;
  public icons: string[];
  public id: string;

  constructor(private route: ActivatedRoute, private dataBase: DataStorageService) {
    this.category = new Category();
    this.icons = AVAILABLE_ICONS;
  }

  ngOnInit() {
    this.subscriptionParam = this.route.params.subscribe((param: any) => {
      if ((this.id = param['id']) != null) { // Search the category by name
        // GET CATEGORY
      }
    });
  }

  ngOnDestroy() {
    this.subscriptionParam.unsubscribe();
    this.subscriptionDB.unsubscribe();
  }

  saveCategory() {
    this.dataBase.saveCategory(this.category);
  }
}
