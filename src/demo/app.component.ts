import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  show = 'selected';
  i = 0;

  scaleRadius = true;
  scaleWidth = false;
  polarData: any;

  polarData1: any;
  polarData2: any;



  constructor() {
    this.polarData1 = {
      data: [[0.5], [4, 4.3, 3.8], [5], [11.2, 11, 11.1, 11.6], [18,19,21,19.5], [20,22,1,19,23.5], [23.8,23.5]],
      domain: [0, 24]
    };
    this.polarData2 = {
      data: [[1,1.2,0.8,1.1], [3,3.2,2,6], [8,8.5,7,7,7.9], [11.2, 11, 11.1, 11.6], [1,11,4,8]],
      domain: [0, 12]
    };

    this.polarData = this.polarData2;

  }

  toogle() {
    if (this.polarData === this.polarData1) {
      this.polarData = this.polarData2;
    } else {
      this.polarData = this.polarData1;
    }
  }

  value() {
    console.log("V called " + this.i++);
    return this.show;
  }

}
