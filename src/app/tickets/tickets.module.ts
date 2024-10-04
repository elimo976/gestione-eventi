import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketBookingComponent } from './ticket-booking/ticket-booking.component';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';


@NgModule({
  declarations: [
    TicketBookingComponent,
    TicketsListComponent,
    TicketDetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TicketsModule { }
