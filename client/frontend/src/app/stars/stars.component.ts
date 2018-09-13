import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {

  @Input() rating = 0;
  starts: boolean[];

  constructor() {
  }

  ngOnInit() {
    this.initStarts();
  }

  initStarts() {
    this.starts = [];
    for (let i = 1; i <= 5; i++) {
      this.starts.push(i > this.rating);
    }
  }

}
