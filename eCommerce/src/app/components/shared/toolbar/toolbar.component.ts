import { Component, OnInit, Output, EventEmitter, DoCheck } from '@angular/core';

import { UserService } from './../../../core/services/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, DoCheck {
  @Output() sidenavToggle = new EventEmitter<void>();

  isLoggedIn: boolean;
  isAdmin: boolean;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  ngDoCheck() {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.isAdmin = this.userService.isAdmin();
  }

  toggleSidenav() {
    this.sidenavToggle.emit();
  }

  logout() {
    this.userService.logout();
  }
}
