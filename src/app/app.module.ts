// Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AngularMaterialModule } from './angular-material/angular-material.module';

// Components
import { AppComponent } from './app.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { CalendarComponent } from './calendar/calendar.component';
import { StatsComponent } from './stats/stats.component';
import { ActivityComponent } from './activity/activity.component';
import { ConfirmDeleteActivity } from './activity/activity.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  { path: 'activities', component: ActivityListComponent },
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
    ConfirmDeleteActivity,
    CalendarComponent,
    StatsComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDeleteActivity]
})
export class AppModule { }
