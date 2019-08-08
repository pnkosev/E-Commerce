import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { GetApprovedItems } from './core/resolvers/get-approved-items.resolver';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
      approvedItems: GetApprovedItems
    }
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'user',
    loadChildren: () => import('./components/user/user.module').then(mod => mod.UserModule)
  },
  {
    path: 'item',
    loadChildren: () => import('./components/item/item.module').then(mod => mod.ItemModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
