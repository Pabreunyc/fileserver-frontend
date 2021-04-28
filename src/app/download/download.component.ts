import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
    console.log('%cDownloadComponent.onInit', 'background-color:black;color:white');
  }
  ngOnDestroy() {
    console.log('%cDownloadComponent.onInit', 'background-color:black;color:black');
  }
}
