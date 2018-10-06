import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent {

  @Input()
  set rating(val: number) {
    this._rating = val;
    this.initStarts();
  }

  get rating() {
    return this._rating;
  }

  _rating = 0;

  starts: boolean[];
  @Input() readonly = true;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  // ngOnChanges() {
  //   this.initStarts();
  // }

  initStarts() {
    this.starts = [];
    for (let i = 1; i <= 5; i++) {
      this.starts.push(i > this.rating);
    }
  }

  clickStar(index: number) {
    if (!this.readonly) {
      this.rating = index + 1;
      this.ratingChange.emit(this.rating);
    }
  }

}
