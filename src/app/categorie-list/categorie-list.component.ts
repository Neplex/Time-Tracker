import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../data-storage/data-storage.service';
import { Category } from '../category';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.css']
})
export class CategorieListComponent implements OnInit {

  @Output() onCategorySelect = new EventEmitter<Category>();

  public categories: Category[] = [];
  private subscription: Subscription;

  constructor(private dataBase: DataStorageService) { }

  ngOnInit() {
    this.subscription = this.dataBase.getCategories().subscribe(cats => {
      this.categories = cats;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setCategory(cat: Category): void {
    this.onCategorySelect.emit(cat);
  }

  refresh(){
    this.subscription = this.dataBase.getCategories().subscribe(cats => {
      this.categories = cats;
    });
    this.setCategory(null);
  }

}
