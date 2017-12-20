// Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  { path: 'activities', component: MainComponent },
  { path: 'activities/:id', component: ActivityComponent },
  { path: 'categories/:id', component: CategoryComponent },
  { path: 'add/activity', component: ActivityComponent },
  { path: 'add/category', component: CategoryComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'stats', component: StatsComponent },
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
    DeleteConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AngularMaterialModule,
    AngularMaterialCalendarModule,
    DataStorageModule
  ],
  entryComponents: [DeleteConfirmDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
