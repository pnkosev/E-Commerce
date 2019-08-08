import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemCreateComponent } from './item-create/item-create.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { ItemDetailsComponent } from './item-details/item-details.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'create',
    component: ItemCreateComponent
  },
  {
    path: 'edit',
    component: ItemEditComponent
  },
  {
    path: 'details/:id',
    component: ItemDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
