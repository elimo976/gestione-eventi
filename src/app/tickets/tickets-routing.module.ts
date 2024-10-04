import { NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { TicketBookingComponent } from './ticket-booking/ticket-booking.component';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';

const routes: Routes = [
 { path: '', component: TicketsListComponent },
 { path: 'booking', component: TicketBookingComponent },
 { path: ':id', component: TicketDetailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TicketsRoutingModule { }