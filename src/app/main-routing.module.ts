import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './shared/pages/welcome/welcome.component';
import { ClientsListComponent } from './modules/client/pages/clients-list/clients-list.component';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
import { clientsListResolver } from './core/resolvers/clients.resolver';


const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent},
  { path: '',   redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'clients',  component: ClientsListComponent,  resolve: {
    someKey: clientsListResolver
    }
 },
  {  path: '**',  component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
