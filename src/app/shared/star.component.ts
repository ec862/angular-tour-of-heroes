import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
})
export class StarComponent implements OnChanges {
  @Input() power: number = 0;
  cropWidth: number = 75;

  ngOnChanges(): void {
    this.cropWidth = (this.power * 75) / 5;
  }
}
