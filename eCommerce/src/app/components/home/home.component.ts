import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Item } from './../../core/models/item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: Item[] = [];

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.items = this.route.snapshot.data.approvedItems.items;
  }

}
