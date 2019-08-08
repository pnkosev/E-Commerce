import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ItemRoutingModule } from './item-routing.module';
import { MaterialModule } from './../../material/material.module';

import { ItemCreateComponent } from './item-create/item-create.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { ItemDetailsComponent } from './item-details/item-details.component';



@NgModule({
  declarations: [
    ItemCreateComponent,
    ItemDetailsComponent,
    ItemEditComponent,
  ],
  imports: [
    CommonModule,
    ItemRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
  ]
})
export class ItemModule { }
