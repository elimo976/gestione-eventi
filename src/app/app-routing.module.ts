import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { adminGuard } from './auth/admin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [adminGuard] // Protezione con la guard per la sezione admin
  },
  {
    path: 'events',
    loadChildren: () => import('./events/events.module').then(m => m.EventsModule)
  },
  { path: 'tickets',
    loadChildren: () => import('./tickets/tickets.module').then(m => m.TicketsModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
