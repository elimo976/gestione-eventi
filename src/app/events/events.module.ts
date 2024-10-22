import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventsService } from './services/events.service';
import { EventsRoutingModule } from './events-routing.module';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    EventListComponent,
    EventDetailComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    FontAwesomeModule
  ],
  exports: [
    EventListComponent
  ],
  providers: [EventsService]
})
export class EventsModule { }
