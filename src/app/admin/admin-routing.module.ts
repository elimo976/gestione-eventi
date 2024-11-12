import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageEventsComponent } from './manage-events/manage-events.component';
import { ManageTicketsComponent } from './manage-tickets/manage-tickets.component';

const routes: Routes = [
  { path: '',
    children: [
      { path: 'manage-events', component: ManageEventsComponent },
      { path: 'manage-tickets', component: ManageTicketsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
