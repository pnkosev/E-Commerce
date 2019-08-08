import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ItemService } from '../services/item.service';

@Injectable({
  providedIn: 'root'
})
export class GetApprovedItems implements Resolve<object> {
  constructor(
    private itemService: ItemService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.itemService.getApprovedItems();
  }
}
