import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './../../material/material.module';
import { FooterComponent } from './footer/footer.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ItemSingleComponent } from './item-single/item-single.component';

@NgModule({
  declarations: [
    FooterComponent,
    SidenavListComponent,
    ToolbarComponent,
    ItemSingleComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  exports: [
    SidenavListComponent,
    ToolbarComponent,
    FooterComponent,
    ItemSingleComponent,
  ]
})

export class SharedModule { }
