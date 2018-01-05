import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';
import { DataStorageService } from '../data-storage/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categorie-list-item',
  templateUrl: './categorie-list-item.component.html',
  styleUrls: ['./categorie-list-item.component.css']
})
export class CategorieListItemComponent implements OnInit {

  private subscriptionUpdateCatInAct: Subscription;

  @Input('category') cat;
  @Output() onCategorySelect = new EventEmitter<void>();
  @Output() onCategoryDelete = new EventEmitter<void>();

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
        this.subscriptionUpdateCatInAct = this.dataBase.getActivities().subscribe(acts => {
          for(let i = 0; i < acts.length; i++){
            for(let j = 0; j < acts[i].categories.length; j++){
              if(this.cat.id == acts[i].categories[j]){
                acts[i].categories.splice(j,1);
                this.dataBase.saveActivity(acts[i]);
              }
            }
          }
        });
        this.onCategoryDelete.emit();
      }
    });
  }
}
