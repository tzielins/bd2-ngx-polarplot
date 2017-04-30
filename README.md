# Bd2NgxPolarplot

Angular2 (well Angular) component for plotting data in cyclic coordinates.

Although it is called polar plot, it is not the de-facto polar plot in the sense in the matlab,
as the data are one dimensional rather then angle/radius in typical polar plot.

It was designed to plot circadian phases, so peak times in data in 24 scale.

The domain rain is cyclic, so the data are mod range, ie data 3, 27, 28 will be plotted
as 3, 3, 4.

The petals represents the mean value of the series. Petals radius and width can be scaled by std dev of the data or the provided error values.
   
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
