import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';
import { DataStorageService } from '../data-storage/data-storage.service';
import { Activity } from '../activity';

@Component({
  selector: 'app-activity-list-item',
  templateUrl: './activity-list-item.component.html',
  styleUrls: ['./activity-list-item.component.css']
})
export class ActivityListItemComponent implements OnInit {

  @Input() activity: Activity;
  @Input() editMode: boolean;
  @Output() onActivitySelect = new EventEmitter<void>();
  @Output() onActivityDelete = new EventEmitter<void>();

  constructor(public dialog: MatDialog, private dataBase: DataStorageService) { }

  ngOnInit() {
  }

  toggleActivity() {
    this.onActivitySelect.emit();
  }

  confirmDelete(): void {
    let dialogRef = this.dialog.open(DeleteConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataBase.deleteActivity(this.activity);
        this.onActivityDelete.emit();
      }
    });
  }

}
