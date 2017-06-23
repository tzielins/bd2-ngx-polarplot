import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  data: number[][];
  labels: string[] = [];

  domain = [0, 24];
  indiv = "selected";
  hidden = false;

  show = 'selected';
  i = 0;

  labelsOn = true;
  scaleRadius = true;
  scaleWidth = false;


  constructor() {

    this.generateData();


  }

  toggleHidden() {
    this.hidden = !this.hidden;
  }

  value() {
    console.log("V called " + this.i++);
    return this.show;
  }

  generateData(): number[][] {
    let series = Math.floor((Math.random() * 4) + 1);

    let rows: number[][] = [];
    rows.push([-23.4, 1, 25.2, 48.7, 73.1]);
    rows.push([22.5, 21.5, 20.6]);
    rows.push([]);
    for (let i = 0; i < series; i++) {

      let len = Math.floor((Math.random() * 5) + 1);
      let err = Math.random() * 7;
      let mean = Math.random() * 24;

      let row = [];
      for (let j = 0; j < len; j++) {
        let x = mean + (0.5 - Math.random()) * err;
        x = Math.round(x * 10) / 10;
        row.push(x);
      }
      rows.push(row);
    }


    let LET = "ABCDEFGHIJKLMN abcdef";
    let labels = rows.map((v, ix) => {

      let s = Math.random() * 30 + 3;
      let label = (ix + 1) + '. '; //
      for (let i = 0; i < s; i++) {
        label += LET[Math.round(Math.random() * (LET.length - 1))];
      }
      //label += " " + ;

      return label;
    });

    this.labels = labels;
    this.data = rows;
    return rows;
  }

}
