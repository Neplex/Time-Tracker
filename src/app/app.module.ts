// Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AngularMaterialCalendarModule } from './angular-material-calendar/angular-material-calendar.module';
import { DataStorageModule } from './data-storage/data-storage.module';

// Components
import { AppComponent } from './app.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { CalendarComponent } from './calendar/calendar.component';
import { StatsComponent } from './stats/stats.component';
import { ActivityComponent } from './activity/activity.component';
import { CategoryComponent } from './category/category.component';
import { ChronoComponent } from './chrono/chrono.component';
import { CategorieListItemComponent } from './categorie-list-item/categorie-list-item.component';
import { CategorieListComponent } from './categorie-list/categorie-list.component';
import { DrawerComponent } from './drawer/drawer.component';
import { MainComponent } from './main/main.component';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';
import { ActivityListItemComponent } from './activity-list-item/activity-list-item.component';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog/delete-confirm-dialog.component';
import { StatsActivityListComponent } from './stats-activity-list/stats-activity-list.component';
import { StatsGraphComponent } from './stats-graph/stats-graph.component';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import { SettingsComponent } from './settings/settings.component';
import { TimeSlotComponent } from './time-slot/time-slot.component';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';

const routes: Routes = [
  { path: 'activities', component: MainComponent },
  { path: 'activities/:id', component: ActivityComponent },
  { path: 'categories/:id', component: CategoryComponent },
  { path: 'add/activity', component: ActivityComponent },
  { path: 'add/category', component: CategoryComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'activities/:id/time-slots/:ts', component: TimeSlotComponent },
  { path: '**', redirectTo: 'activities' }
];

@NgModule({
  declarations: [
    AppComponent,
    ActivityListComponent,
    ActivityComponent,
    CalendarComponent,
    StatsComponent,
    CategoryComponent,
    ChronoComponent,
    CategorieListItemComponent,
    CategorieListComponent,
    DrawerComponent,
    MainComponent,
    MainToolbarComponent,
    ActivityListItemComponent,
    DeleteConfirmDialogComponent,
    StatsActivityListComponent,
    StatsGraphComponent,
    DateRangePickerComponent,
    SettingsComponent,
    TimeSlotComponent,
    DateTimePickerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    ChartsModule,
    AngularMaterialModule,
    AngularMaterialCalendarModule,
    DataStorageModule
  ],
  entryComponents: [DeleteConfirmDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
