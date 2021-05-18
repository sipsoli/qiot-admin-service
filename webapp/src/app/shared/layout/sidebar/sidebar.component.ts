import { Component, OnInit } from '@angular/core';
import {faRocket, faTachometerAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  faRocket = faRocket;
  faTachometerAlt = faTachometerAlt

  constructor() { }

  ngOnInit(): void {
  }

}
