import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent } from './event-detail/event-detail.component';



@NgModule({
  declarations: [
    EventListComponent,
    EventDetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EventsModule { }
