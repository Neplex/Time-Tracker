import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';
import { DataStorageService } from '../data-storage/data-storage.service';

@Component({
  selector: 'app-categorie-list-item',
  templateUrl: './categorie-list-item.component.html',
  styleUrls: ['./categorie-list-item.component.css']
})
export class CategorieListItemComponent implements OnInit {

  @Input('category') cat;
  @Output() onCategorySelect = new EventEmitter<void>();

  constructor(public dialog: MatDialog, private dataBase: DataStorageService) { }

  ngOnInit() {
  }

  setCategory(): void {
    this.onCategorySelect.emit();
  }

  confirmDelete(): void {
    let dialogRef = this.dialog.open(DeleteConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataBase.deleteCategory(this.cat);
      }
    });
  }
}
