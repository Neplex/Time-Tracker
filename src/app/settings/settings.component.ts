import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../data-storage/data-storage.service';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';
import { Subscription } from 'rxjs';
import { APP_VERSION } from '../global';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public app_version = APP_VERSION;
  public dev_mode: boolean = false;

  constructor(public dialog: MatDialog,private dataBase: DataStorageService) { }

  ngOnInit() {
    this.setDownloadFile();
  }

  setDownloadFile() {
    let subscriptionAct: Subscription;
    let subscriptionCat: Subscription;
    let data = { "activities": null, "categories": null };
    subscriptionAct = this.dataBase.getActivities().subscribe(acts => {
      data["activities"] = acts;
      subscriptionCat = this.dataBase.getCategories().subscribe(cats => {
        data["categories"] = cats;
      }, null, () => {
        subscriptionCat.unsubscribe();
        let strdata = JSON.stringify(data);
        let blob = new Blob([strdata], { type: 'application/json' });
        let url = window.URL.createObjectURL(blob);
        let a: HTMLAnchorElement = (<HTMLAnchorElement>document.getElementById('export'));
        a.download = "export.json";
        a.href = url;
      });
    }, null, () => {
      subscriptionAct.unsubscribe();
    });
  }

  fileEvent(e) {
    let file: File = e.target.files[0];
    let reader: FileReader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e: any) => {
      let data = JSON.parse(e.target.result);
      for (let act of data["activities"]) {
        let tmp = this.dataBase.fromDBToActivity(act);
        this.dataBase.saveActivity(tmp);
      }
      for (let cat of data["categories"]) {
        this.dataBase.saveCategory(cat);
      }
    }

  }

  clearDB() {
    let dialogRef = this.dialog.open(DeleteConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataBase.clearDB();
      }
    });
  }

  destroyDB() {
    let dialogRef = this.dialog.open(DeleteConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataBase.destroyDB();
      }
    });
  }

}
