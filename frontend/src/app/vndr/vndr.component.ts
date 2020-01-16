import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vndr',
  templateUrl: './vndr.component.html',
  styleUrls: ['./vndr.component.scss']
})
export class VndrComponent implements OnInit {
  collapedSideBar: boolean;
  constructor() { }

  ngOnInit() {
  }
  receiveCollapsed($event) {
    this.collapedSideBar = $event;
}

}
