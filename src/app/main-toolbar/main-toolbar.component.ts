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
  @Output() searchModeChange = new EventEmitter<boolean>();
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
    this._editMode = mode;
    this.editModeChange.emit(this._editMode);
  }
  get editMode(): boolean {
    return this._editMode;
  }

  @Input()
  set searchMode(mode: boolean) {
    this._searchMode = mode;
    this.searchModeChange.emit(this._searchMode);
  }
  get searchMode(): boolean {
    return this._searchMode;
  }

  @Input()
  set search(txt: string) {
    this._search = txt;
    this.searchChange.emit(this._search);
  }
  get search(): string {
    return this._search;
  }

  public mode: string = null;
  private _activity: Activity = null;
  private _editMode: boolean = false;
  private _searchMode: boolean = false;
  private _search: string = "";

  constructor() { }

  ngOnInit() {
  }

  openMenu(): void {
    this.menu.emit();
  }

  toogleEditMode() {
    this.editMode = !this.editMode;
    this.mode = this.editMode ? 'edit' : null;
  }

  toogleSearchMode() {
    this.searchMode = !this.searchMode;
    this.mode = this.searchMode ? 'search' : null;
  }

  stopActivity() {
    if (this.activity != null) {
      this.activity.stop();
      this.activity = null;
    }
  }

}
