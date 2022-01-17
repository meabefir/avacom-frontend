import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];

  constructor() { }

  ngOnInit(): void {
  }

}
