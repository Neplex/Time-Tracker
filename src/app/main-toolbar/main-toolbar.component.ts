import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Activity } from '../activity';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.css']
})
export class MainToolbarComponent implements OnInit {

  @Input() title: string;
  @Output() activityChange = new EventEmitter<Activity>();
  @Output() editModeChange = new EventEmitter<boolean>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() menu = new EventEmitter<void>();

  @Input()
  set activity(act: Activity) {
    this._activity = act;
    this.activityChange.emit(this._activity);
  }
  get activity(): Activity {
    return this._activity;
  }

  @Input()
  set editMode(mode: boolean) {
    this._edit = mode;
    this.editModeChange.emit(this._edit);
  }
  get editMode(): boolean {
    return this._edit;
  }

  @Input()
  set search(txt: string) {
    this._search = txt;
    this.searchChange.emit(this._search);
  }
  get search(): string {
    return this._search;
  }

  private _activity: Activity = null;
  private _edit: boolean = false;
  private _search: string = "";

  constructor() { }

  ngOnInit() {
  }

  openMenu(): void {
    this.menu.emit();
  }

  toogleEditMode() {
    this.editMode = !this.editMode;
  }

  stopActivity() {
    if (this.activity != null) {
      this.activity.stop();
      this.activity = null;
    }
  }

}
