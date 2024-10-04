import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ManageEventsComponent } from './manage-events/manage-events.component';
import { ManageTicketsComponent } from './manage-tickets/manage-tickets.component';


@NgModule({
  declarations: [
    ManageEventsComponent,
    ManageTicketsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
