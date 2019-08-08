import { Component, DoCheck } from '@angular/core';

import { UserService } from './../../../core/services/user.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements DoCheck {
  isLoggedIn: boolean;
  isAdmin: boolean;

  constructor(
    private userService: UserService
  ) { }

  ngDoCheck() {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.isAdmin = this.userService.isAdmin();
  }

  logout() {
    localStorage.clear();
  }
}
