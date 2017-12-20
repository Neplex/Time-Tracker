import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-categorie-list-item',
  templateUrl: './categorie-list-item.component.html',
  styleUrls: ['./categorie-list-item.component.css']
})
export class CategorieListItemComponent implements OnInit {

  @Input('category') cat;
  @Output() onCategorySelect = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  setCategory(): void {
    this.onCategorySelect.emit();
  }

}
