import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
public tabItems:MenuItem[] = [
  {label: 'Stats', icon: 'fa fa-fw fa-bar-chart'},
  {label: 'Calendar', icon: 'fa fa-fw fa-calendar'},
  {label: 'Documentation', icon: 'fa fa-fw fa-book'},
  {label: 'Support', icon: 'fa fa-fw fa-support'},
  {label: 'Social', icon: 'fa fa-fw fa-twitter'}
];

  constructor() { }

  ngOnInit() {
    console.log('%cHomeComponent.onInit', 'background-color:black;color:white');
  }
  ngOnDestroy() {
    console.log('%cHomeComponent.onInit', 'background-color:red;color:white');
  }
}
