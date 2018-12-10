import { Component, OnInit } from '@angular/core';

import { DrinkerService, drinkerInfo } from '../drinker.service';

@Component({
  selector: 'app-drinker',
  templateUrl: './drinker.component.html',
  styleUrls: ['./drinker.component.css']
})
export class DrinkerComponent implements OnInit {
  drinker : drinkerInfo[]
  constructor(
    public drinkerService : DrinkerService
  ) { 
    
  }

  ngOnInit() {
    this.getDrinkers();
  }
  getDrinkers() {
    this.drinkerService.getDrinkers().subscribe(
      data => {
        this.drinker = data;
      },
      error => {
        alert('Could not retrieve a list of drinkers');
      }
    );

}
}
