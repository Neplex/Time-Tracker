import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from '../category';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit {

  @Output() onCategorySelect = new EventEmitter<Category>();

  constructor() { }

  ngOnInit() {
  }

  setCategory(cat: Category) {
    this.onCategorySelect.emit(cat);
  }

}
