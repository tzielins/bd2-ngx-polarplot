import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bd2-ngx-polarplot-app';

  data: number[][];
  labels: string[] = [];
  removed: number[] = [];

  domain = [0, 24];
  indiv = 'selected';
  hidden = false;

  show = 'selected';
  i = 0;

  labelsOn = true;
  scaleRadius = true;
  scaleWidth = false;

  constructor() {

    this.generateData();


  }

  toggleRemoved() {
    if (this.removed.length === 0) {
      this.removed = [0, 3];
    } else {
      this.removed = [];
    }
  }

  toggleHidden() {
    this.hidden = !this.hidden;
  }

  value() {
    console.log('V called ' + this.i++);
    return this.show;
  }

  generateData(): number[][] {
    const series = Math.floor((Math.random() * 4) + 1);

    const rows: number[][] = [];
    rows.push([-23.4, 1, 25.2, 48.7, 73.1]);
    rows.push([22.5, 21.5, 20.6]);
    rows.push([]);
    for (let i = 0; i < series; i++) {

      const len = Math.floor((Math.random() * 5) + 1);
      const err = Math.random() * 7;
      const mean = Math.random() * 24;

      const row = [];
      for (let j = 0; j < len; j++) {
        let x = mean + (0.5 - Math.random()) * err;
        x = Math.round(x * 10) / 10;
        row.push(x);
      }
      rows.push(row);
    }


    const LET = 'ABCDEFGHIJKLMN abcdef';
    const labels = rows.map((v, ix) => {

      const s = Math.random() * 30 + 3;
      let label = (ix + 1) + '. '; //
      for (let i = 0; i < s; i++) {
        label += LET[Math.round(Math.random() * (LET.length - 1))];
      }
      // label += " " + ;

      return label;
    });

    this.labels = labels;
    this.data = rows;
    return rows;
  }

}
