"use strict";
(self["webpackChunkbd2_ngx_polarplot_demo"] = self["webpackChunkbd2_ngx_polarplot_demo"] || []).push([["main"],{

/***/ 36997:
/*!******************************************************************!*\
  !*** ./projects/bd2-ngx-polarplot-demo/src/app/app.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 28653);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 59295);
/* harmony import */ var _bd2_ngx_polarplot_src_lib_polar_plot_utils_color_palette__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../bd2-ngx-polarplot/src/lib/polar-plot-utils/color-palette */ 73272);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var bd2_ngx_polarplot__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! bd2-ngx-polarplot */ 5574);







function AppComponent_li_66_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("[", row_r2, "],");
  }
}
function AppComponent_li_71_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("[", row_r3, "],");
  }
}
class AppComponent {
  constructor() {
    this.title = 'bd2-ngx-polarplot-app';
    this.labels = [];
    this.removed = [];
    this.domain = [0, 24];
    this.indiv = 'selected';
    this.hidden = false;
    this.show = 'selected';
    this.i = 0;
    this.labelsOn = true;
    this.scaleRadius = true;
    this.scaleWidth = false;
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
  // for testing fast changing data
  generateDelayedData() {
    let s;
    s = (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.interval)(1000).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.take)(3)).subscribe(v => this.generateDataInner(1, 15), err => {}, () => {
      if (s) {
        s.unsubscribe();
      }
    });
  }
  generateData() {
    // this.generateDataInner(1, 6);
    this.generateDelayedData();
  }
  generateDataInner(nrBase = 1, increase = 5) {
    const series = Math.floor(Math.random() * increase + nrBase);
    const rows = [];
    rows.push([-23.4, 1, 25.2, 48.7, 73.1]);
    rows.push([22.5, 21.5, 20.6]);
    rows.push([]);
    for (let i = 0; i < series; i++) {
      const len = Math.floor(Math.random() * 5 + 1);
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
      let label = ix + 1 + '. '; //
      for (let i = 0; i < s; i++) {
        label += LET[Math.round(Math.random() * (LET.length - 1))];
      }
      // label += " " + ;
      return label;
    });
    this.labels = labels;
    this.data = rows;
    this.palette = Math.random() > 0.2 ? _bd2_ngx_polarplot_src_lib_polar_plot_utils_color_palette__WEBPACK_IMPORTED_MODULE_0__.BD2ColorPalette.palette(10) : ['blue'];
    return rows;
  }
}
AppComponent.ɵfac = function AppComponent_Factory(t) {
  return new (t || AppComponent)();
};
AppComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: AppComponent,
  selectors: [["app-root"]],
  decls: 72,
  vars: 19,
  consts: [[1, "container", "central-area"], [1, "row"], [1, "col-md-12"], [1, "col-sm-4"], [1, "form-group"], [1, "btn", "btn-primary", "btn-sm", 3, "click"], [1, "form-control", 3, "ngModel", "ngModelChange"], [1, "col-sm-6"], [3, "data", "domain", "showIndividuals", "scaleRadius", "scaleWidth", "hidden", "labels", "labelsOn", "removed", "palette"], [1, "col-sm-12"], [1, "list-unstyled", 2, "margin", "1em"], [4, "ngFor", "ngForOf"]],
  template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, " Polar plot demo. V 2.2.0 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div")(6, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, " Simple demo of circadian polar plot. It is not a polar plot in the sense of polar coordinates (radius/angle), but it represents \"cyclic data\" i.e. modulo domain range. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Generated data always contains fixed two first series: first one demonstrate data with peak times ~(1h+n24h), second a simple data spread.");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Petals points to the mean of the input series, their width and radius can be scaled by std dev od the data.");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](12, "hr");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 1)(14, "div", 3)(15, "div")(16, "div", 4)(17, "a", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AppComponent_Template_a_click_17_listener() {
        return ctx.toggleRemoved();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "Toggle removed");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](19, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "div", 4)(23, "a", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AppComponent_Template_a_click_23_listener() {
        return ctx.generateData();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](24, "generate");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "div", 4)(26, "a", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AppComponent_Template_a_click_26_listener() {
        return ctx.toggleHidden();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](27, "toggle hidden");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](28);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "div", 4)(30, "label");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](31, "Show individuals");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](32, "select", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_select_ngModelChange_32_listener($event) {
        return ctx.indiv = $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "option");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](34, "none");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](35, "option");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](36, "selected");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](37, "option");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](38, "all");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](39, "div", 4)(40, "label");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](41, "Scale Radius:");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](42, "a", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AppComponent_Template_a_click_42_listener() {
        return ctx.scaleRadius = !ctx.scaleRadius;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](43);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](44, "div", 4)(45, "label");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](46, "Scale Width:");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](47, "a", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AppComponent_Template_a_click_47_listener() {
        return ctx.scaleWidth = !ctx.scaleWidth;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](48);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](49, "div", 4)(50, "label");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](51, "Toogle labels:");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](52, "a", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AppComponent_Template_a_click_52_listener() {
        return ctx.labelsOn = !ctx.labelsOn;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](53);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](54, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](55, "bd2-ngx-polar-plot", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](56, "div", 9)(57, "div", 4)(58, "label");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](59, "Domain:");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](60, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](61);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](62, "div", 4)(63, "label");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](64, "Data:");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](65, "ul", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](66, AppComponent_li_66_Template, 2, 1, "li", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](67, "div", 4)(68, "label");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](69, "Labels:");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](70, "ul", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](71, AppComponent_li_71_Template, 2, 1, "li", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](21);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("[", ctx.removed, "]");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.hidden, " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.indiv);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](11);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.scaleRadius ? "On" : "Off", "");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.scaleWidth ? "On" : "Off", "");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.labelsOn ? "On" : "Off", "");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("data", ctx.data)("domain", ctx.domain)("showIndividuals", ctx.indiv)("scaleRadius", ctx.scaleRadius)("scaleWidth", ctx.scaleWidth)("hidden", ctx.hidden)("labels", ctx.labels)("labelsOn", ctx.labelsOn)("removed", ctx.removed)("palette", ctx.palette);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("[", ctx.domain, "]");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.data);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.labels);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgModel, bd2_ngx_polarplot__WEBPACK_IMPORTED_MODULE_6__.PolarPlotComponent],
  styles: ["\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 3895:
/*!***************************************************************!*\
  !*** ./projects/bd2-ngx-polarplot-demo/src/app/app.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ 34497);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ 36997);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var bd2_ngx_polarplot__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bd2-ngx-polarplot */ 5574);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);





class AppModule {}
AppModule.ɵfac = function AppModule_Factory(t) {
  return new (t || AppModule)();
};
AppModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: AppModule,
  bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent]
});
AppModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__.BrowserModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormsModule, bd2_ngx_polarplot__WEBPACK_IMPORTED_MODULE_4__.BD2NgxPolarplotModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__.BrowserModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormsModule, bd2_ngx_polarplot__WEBPACK_IMPORTED_MODULE_4__.BD2NgxPolarplotModule]
  });
})();

/***/ }),

/***/ 24363:
/*!*************************************************************************!*\
  !*** ./projects/bd2-ngx-polarplot-demo/src/environments/environment.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
  production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

/***/ }),

/***/ 11882:
/*!*****************************************************!*\
  !*** ./projects/bd2-ngx-polarplot-demo/src/main.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 34497);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 3895);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 24363);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
  (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule).catch(err => console.error(err));

/***/ }),

/***/ 73272:
/*!******************************************************************************!*\
  !*** ./projects/bd2-ngx-polarplot/src/lib/polar-plot-utils/color-palette.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BD2ColorPalette": () => (/* binding */ BD2ColorPalette)
/* harmony export */ });
class BD2ColorPalette {
  static extendPalette(palette, size) {
    if (!palette || palette.length === 0) {
      palette = ['black'];
    }
    const out = [];
    for (let i = 0; i < size; i++) {
      out.push(palette[i % palette.length]);
    }
    return out;
  }
  static palette(size) {
    if (size <= BD2ColorPalette.schemeCategory10.length) {
      return BD2ColorPalette.extendPalette(BD2ColorPalette.schemeCategory10, size);
    } else {
      return BD2ColorPalette.extendPalette(BD2ColorPalette.schemeCategory20, size);
    }
  }
}
BD2ColorPalette.schemeCategory10 = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];
BD2ColorPalette.schemeCategory20 = ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5'];

/***/ }),

/***/ 5574:
/*!***************************************************************!*\
  !*** ./dist/bd2-ngx-polarplot/fesm2020/bd2-ngx-polarplot.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BD2NgxPolarplotModule": () => (/* binding */ BD2NgxPolarplotModule),
/* harmony export */   "PolarPlotComponent": () => (/* binding */ PolarPlotComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ 17659);



const d3 = d3__WEBPACK_IMPORTED_MODULE_0__;
/**
 D3 integration was originally based on the code for npm library: d3-ng2-service
 by Tom Wanzek, https://github.com/tomwanzek/d3-ng2-service.

 That package was used during developement and then converted into inline service
 to reduce the dependencies and boundle size.

 At some point, I moved to to simpler dependency on d3:
 npm install --save d3
 npm install --save-dev @types/d3

 and removed the parts from d3-modules.ts as they were causing errors
 (not sure how to fix them and also one dependency is easier to maintain).
 */

/*
// that has been removed after importing a single d3 dependency

export {
  // d3-array
  Bin,
  Bisector,
  HistogramGenerator,
  Numeric,
  ThresholdArrayGenerator,
  ThresholdCountGenerator,
  // d3-axis
  Axis,
  AxisContainerElement,
  AxisScale,
  AxisTimeInterval,
  // d3-scale
  InterpolatorFactory,
  ScaleBand,
  ScaleIdentity,
  ScaleLinear,
  ScaleLogarithmic,
  ScaleOrdinal,
  ScalePoint,
  ScalePower,
  ScaleQuantile,
  ScaleQuantize,
  ScaleSequential,
  ScaleThreshold,
  ScaleTime,

  // d3-selection
  ArrayLike,
  BaseEvent,
  BaseType,
  ContainerElement,
  EnterElement,
  Local,
  NamespaceLocalObject,
  NamespaceMap,
  Selection,
  SelectionFn,
  TransitionLike,
  ValueFn,
  // d3-selection-multi
  ValueMap,
  // d3-shape
  Arc,
  Area,
  DefaultArcObject,
  Line,
  Pie,
  PieArcDatum,
  RadialArea,
  RadialLine,
  Series,
  SeriesPoint,
  Stack,
  Symbol,
  SymbolType,
  // d3-transition
  Transition
} from './d3-modules';


 */

class PolarPoint {
  constructor(xy, color, hidden) {
    this.xy = xy;
    this.color = color;
    this.hidden = hidden;
  }
}
class PetalNode {
  constructor() {
    this.individuals = [];
  }
}
class SmartRounder {
  static round(value, base) {
    base = base || value;
    base = Math.abs(base);
    if (base < 0.01) {
      return value;
    }
    if (base < 1) {
      return Math.round(value * 10000) / 10000;
    }
    if (base < 1000) {
      return Math.round(value * 100) / 100;
    }
    return Math.round(value);
  }
}
const DEF_ERR = 0.6 / 24;
const DEF_WIDTH = 0.6 / 24;
const MIN_WIDTH = 0.1 / 24;
const NEGLIGIBLE_ERROR = 0.5 / 24;
const MAX_ERROR = 0.33; // 8/24
class PolarDomainUtil {
  dataToPetals(dataGroups, domain, scaleRadius, scaleWidth, errors) {
    if (!dataGroups) {
      return [];
    }
    domain[2] = domain[1] - domain[0];
    return dataGroups.map((g, ix) => this.dataToPetal(g, domain, scaleRadius, scaleWidth, errors ? errors[ix] : null));
  }
  dataToPetal(data, domain, scaleRadius, scaleWidth, error) {
    const node = this.calculatePetalProperties(data, domain, scaleRadius, scaleWidth, error);
    node.polarAngle = this.calculatePolarAngle(node.peak, domain);
    node.petalPath = this.calculatePetalPath(node.peak, node.width, node.radiusScale, domain);
    node.polarCoordinates = this.calculatePolarCoordinate(node.peak, domain);
    // shift back after normalization
    node.peak = node.peak + domain[0];
    node.individuals = this.dataToPolarPoint(data, domain);
    return node;
  }
  dataToPolarPoint(data, domain) {
    const ind = data.map(a => {
      const v = new PolarPoint(this.calculatePolarCoordinate(a, domain), undefined);
      return v;
    });
    return ind;
  }
  calculateCircularMeanAndDev(data, domain) {
    data = data.map(v => this.normalize(v, domain));
    const m = d3.mean(data);
    const std = d3.deviation(data) || 0;
    const rot = domain[2] / 2;
    data = data.map(v => v < rot ? v + domain[2] : v);
    const rotM = d3.mean(data) % domain[2];
    const rotStd = d3.deviation(data) || 0;
    if (rotStd < std) {
      return [rotM, rotStd];
    } else {
      return [m, std];
    }
  }
  calculatePetalProperties(data, domain, scaleRadius, scaleWidth, error) {
    const node = new PetalNode();
    const meanStd = this.calculateCircularMeanAndDev(data, domain);
    node.peak = meanStd[0];
    node.roundedPeak = SmartRounder.round(node.peak);
    if ((scaleRadius || scaleWidth) && !error) {
      error = meanStd[1];
    }
    node.width = scaleWidth ? error : DEF_WIDTH * domain[2];
    if (node.width < MIN_WIDTH * domain[2]) {
      node.width = MIN_WIDTH * domain[2];
    }
    if (node.width > domain[2] / 2) {
      node.width = domain[2] / 2;
    }
    node.radiusScale = 1;
    if (scaleRadius) {
      error = error / domain[2];
      error = error <= NEGLIGIBLE_ERROR ? 0 : error;
      error = error > MAX_ERROR ? MAX_ERROR : error;
      node.radiusScale = 1 - 0.5 * error / MAX_ERROR;
    }
    return node;
  }
  calculatePetalPath(peak, width, radiusScale, domain) {
    const path = [[0, 0], [0.5 * radiusScale, this.calculatePolarAngle(peak - width, domain)], [1 * radiusScale, this.calculatePolarAngle(peak, domain)], [0.5 * radiusScale, this.calculatePolarAngle(peak + width, domain)]];
    return path;
  }
  normalize(value, domain) {
    value = value - domain[0];
    value = value % domain[2];
    if (value < 0) {
      value += domain[2];
    }
    return value;
  }
  calculatePolarCoordinate(value, domain) {
    value = this.normalize(value, domain);
    return this.normalizedPeakToPolar(value, domain[2]);
  }
  normalizedPeakToPolar(value, range) {
    return [Math.cos(value * 2 * Math.PI / range - Math.PI / 2), Math.sin(value * 2 * Math.PI / range - Math.PI / 2), value];
  }
  calculatePolarAngle(value, domain) {
    value = this.normalize(value, domain);
    return value * 2 * Math.PI / domain[2];
  }
}
class BD2ColorPalette {
  static extendPalette(palette, size) {
    if (!palette || palette.length === 0) {
      palette = ['black'];
    }
    const out = [];
    for (let i = 0; i < size; i++) {
      out.push(palette[i % palette.length]);
    }
    return out;
  }
  static palette(size) {
    if (size <= BD2ColorPalette.schemeCategory10.length) {
      return BD2ColorPalette.extendPalette(BD2ColorPalette.schemeCategory10, size);
    } else {
      return BD2ColorPalette.extendPalette(BD2ColorPalette.schemeCategory20, size);
    }
  }
}
BD2ColorPalette.schemeCategory10 = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];
BD2ColorPalette.schemeCategory20 = ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5'];
class GraphicContext {}
class LookAndFeel {
  constructor() {
    this.baseTransitionsTime = 400;
    this.gridColor = '#CDCDCD';
    this.axisColor = 'white';
    this.axisWidth = '2px';
    // done by css
    // axisFontSize: "10px",
    // tooltipFontSize: "11px",
    this.dotsCircleRadius = 4;
    this.dotsCircleStrokeWidth = '1px';
    this.dotsCircleFillOpacity = 0.5;
    this.petalAreaOpacity = 0.35;
    this.petalAreaOpacityActive = 0.7;
    this.petalLineWidth = '3px';
    this.petalCircleRadius = 4;
    this.petalCircleOpacity = 0.8;
  }
}
class PolarPlotComponent {
  set domain(domain) {
    this._domain = [domain[0], domain[1], domain[1] - domain[0]];
  }
  constructor(ngZone, changeDetectorRef, element) {
    this.ngZone = ngZone;
    this.changeDetectorRef = changeDetectorRef;
    this.removed = [];
    this.scaleRadius = true;
    this.scaleWidth = false;
    this.showIndividuals = 'selected';
    this.palette = [];
    this.labels = [];
    this.labelsOn = true;
    this.lookAndFeel = new LookAndFeel();
    this.colors = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.showAllIndividuals = false;
    this.showSelectedIndividuals = false;
    //private individualPolarData: PolarPoint[][];
    this.graphicContext = new GraphicContext();
    this.d3 = d3;
    // this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
    this.polarUtil = new PolarDomainUtil();
  }
  /**
   * It is detached from angular to prevent unnecessary change detection
   */
  ngAfterViewInit() {
    this.changeDetectorRef.detach();
  }
  /**
   * Explicit triggers re-drawing as need to have all the parameters set (so will not redrawn if data came frist and domain later)
   * @param changes
   */
  ngOnChanges(changes) {
    if (!this.data || !this._domain) {
      return;
    }
    // console.log("Changes", changes);
    this.showSelectedIndividuals = this.showIndividuals === 'selected';
    this.showAllIndividuals = this.showIndividuals === 'all';
    this.updatePlot();
  }
  ngOnInit() {
    if (this.parentNativeElement !== null) {} else {
      console.error('Missing parrent element for the component');
    }
  }
  ngOnDestroy() {
    if (this.d3Svg && this.d3Svg.empty && !this.d3Svg.empty()) {
      this.d3Svg.selectAll('*').remove();
    }
  }
  initializeSvg() {
    const pWidth = 500;
    const pHeight = 500;
    const d3ParentElement = this.d3.select(this.parentNativeElement);
    this.d3Svg = d3ParentElement.select('.polarplot').append('svg');
    this.d3Svg.attr('width', '100%').attr('viewBox', '0 0 ' + pWidth + ' ' + pHeight);
    const context = new GraphicContext();
    context.mainPane = this.d3Svg.append('g').attr('transform', 'translate(' + pWidth / 2 + ',' + pHeight / 2 + ')'); // moves 0,0 of the pain to the middle of the graphics
    context.radius = Math.min(pWidth, pHeight) / 2 - 30;
    return context;
  }
  prepareLegendtip(context) {
    if (!context.legendtip) {
      // Set up the small tooltip in the centre for when you hover over a circle
      context.legendtip = context.mainPane.append('g').classed('legendtipWrapper', true);
      context.legendtipBox = context.legendtip.append('rect').style('fill', 'white').style('fill-opacity', 0.9).style('stroke', 'grey');
      context.legendtipText = context.legendtip.append('text').attr('class', 'legendtip').attr('text-anchor', 'middle')
      // .attr("dy", "0.35em")
      // .style("font-size", this.lookAndFeel.tooltipFontSize) //"11px")
      .style('opacity', 1);
      context.legendtip
      // .style("visibility", "hidden");
      .style('display', 'none');
    }
    return context;
  }
  showLegendtip(p, radius) {
    if (!this.labelsOn) {
      return;
    }
    this.graphicContext.legendtipText.attr('x', 0).attr('y', 0).text(p.label);
    // it has to be before the box cause of the bug in firefox
    this.graphicContext.legendtip
    // .style("visibility", "visible");
    .style('display', null);
    const bbox = this.graphicContext.legendtipText.node().getBBox();
    this.graphicContext.legendtipBox.attr('x', bbox.x - 3).attr('y', bbox.y - 2).attr('width', bbox.width + 6).attr('height', bbox.height + 4);
  }
  hideLegendtip() {
    this.graphicContext.legendtip
    // .style("visibility", "hidden");
    .style('display', 'none');
  }
  prepareTooltip(context) {
    if (!context.tooltip) {
      // Set up the small tooltip for when you hover over a circle
      context.tooltip = context.mainPane.append('g').classed('tooltipWrapper', true);
      context.tooltipBox = context.tooltip.append('rect').style('fill', 'white').style('fill-opacity', 0.8).style('stroke', 'grey');
      context.tooltipText = context.tooltip.append('text').attr('class', 'tooltip').attr('text-anchor', 'middle').attr('dy', '0.35em')
      // .style("font-size", this.lookAndFeel.tooltipFontSize) //"11px")
      .style('opacity', 1);
      context.tooltip
      // .style("visibility", "hidden");
      .style('display', 'none');
    }
    return context;
  }
  showTooltip(p, radius) {
    this.graphicContext.tooltipText.attr('x', (radius + 15) * p.polarCoordinates[0]).attr('y', (radius + 15) * p.polarCoordinates[1]).text(p.roundedPeak);
    // it has to be before the get BBox cause of the firefox errors
    this.graphicContext.tooltip
    // .style("visibility", "visible");
    .style('display', null);
    const bbox = this.graphicContext.tooltipText.node().getBBox();
    this.graphicContext.tooltipBox.attr('x', bbox.x - 3).attr('y', bbox.y - 2).attr('width', bbox.width + 6).attr('height', bbox.height + 4);
  }
  hideTooltip() {
    // this.graphicContext.tooltip
    // .transition().duration(this.lookAndFeel.baseTransitionsTime / 2)
    // .style("opacity", 0);
    this.graphicContext.tooltip
    // .style("visibility", "hidden");
    .style('display', 'none');
  }
  updatePlot() {
    if (!this.d3Svg) {
      this.graphicContext = this.initializeSvg();
      this.graphicContext = this.plotAxisGrid(this.graphicContext);
    }
    // the grid is plotted only once, only the lables are updated
    this.updateAxisLabels(this._domain, this.graphicContext.axisGrid);
    this.graphicContext = this.updatePalette(this.data, this.palette, this.graphicContext);
    const petalNodes = this.prepareDataModel(this.data, this._domain, this.scaleRadius, this.scaleWidth, this.errors, this.labels, this.removed, this.graphicContext.palette);
    //this.individualPolarData = this.prepareIndividualPolarData(this.data, this._domain, this.removed, this.graphicContext.palette);
    //this.individualPolarData = this.individualPolarData.filter(d => d.length !== 0);
    this.graphicContext = this.plotDataPetals(petalNodes, this.scaleRadius, this.scaleWidth, this.graphicContext);
    this.graphicContext = this.plotAllDataDots(petalNodes, this.showAllIndividuals, this.graphicContext);
    this.graphicContext = this.prepareIndividualDataInset(this.graphicContext);
    this.graphicContext = this.prepareTooltip(this.graphicContext);
    this.graphicContext = this.prepareLegendtip(this.graphicContext);
  }
  prepareDataModel(dataGroups, domain, scaleRadius, scaleWidth, errors, labels, removed, palette) {
    let petalNodes = this.polarUtil.dataToPetals(this.data, this._domain, this.scaleRadius, this.scaleWidth, this.errors);
    this.labelPetals(petalNodes, labels);
    this.colorPetals(petalNodes, palette);
    // mark hidden
    removed.forEach(ix => {
      if (petalNodes[ix]) {
        petalNodes[ix].hidden = true;
        petalNodes[ix].individuals.forEach(p => p.hidden = true);
      }
    });
    // petalNodes = petalNodes.filter(n => !n.hidden);
    // remove empty data
    petalNodes = petalNodes.filter(n => !isNaN(n.peak));
    return petalNodes;
  }
  updatePalette(data, palette, context) {
    if (!palette || palette.length === 0) {
      context.palette = BD2ColorPalette.palette(data.length);
    } else {
      context.palette = BD2ColorPalette.extendPalette(palette, data.length);
    }
    this.colors.next(context.palette.slice());
    return context;
  }
  labelPetals(petals, labels) {
    if (!labels) {
      labels = [];
    }
    petals.forEach((n, ix) => n.label = labels[ix] ? labels[ix] : '' + (ix + 1));
  }
  colorPetals(petals, palette) {
    petals.forEach((b, ix) => {
      b.color = palette[ix];
      b.individuals.forEach(p => p.color = b.color);
    });
  }
  plotDataPetals(petalNodes, scaleRadius, scaleWidth, context) {
    const transitionsTime = this.lookAndFeel.baseTransitionsTime;
    const d3 = this.d3;
    const radius = context.radius;
    if (!context.petalsWrapper) {
      context.petalsWrapper = context.mainPane.append('g').attr('class', 'petalsWrapper');
    }
    const petalsWrapper = context.petalsWrapper;
    const petalLine = p => {
      return d3.lineRadial().radius(function (d) {
        return radius * d[0];
      }).angle(function (d) {
        return d[1];
      }).curve(d3.curveCardinalClosed)(p.petalPath);
    };
    const instance = this;
    // so that angular change detection is not triggered for mouseover/our events or transitions
    this.ngZone.runOutsideAngular(() => {
      const petals = petalsWrapper.selectAll('.petal').data(petalNodes);
      const petalAreaOpacity = this.lookAndFeel.petalAreaOpacity;
      petals.select('.petalsArea').transition().duration(transitionsTime).attr('d', petalLine).style('fill', d => d.color).style('fill-opacity', this.lookAndFeel.petalAreaOpacity).on('interrupt', function (d) {
        d3.select(this).attr('d', petalLine).style('fill', _ => d.color).style('fill-opacity', petalAreaOpacity);
      });
      petals.select('.petalsLine').transition().duration(transitionsTime).attr('d', petalLine).style('stroke', d => d.color).style('stroke-opacity', 1).style('stroke-width', this.lookAndFeel.petalLineWidth).on('interrupt', function (d) {
        d3.select(this).attr('d', petalLine).style('stroke', _ => d.color).style('stroke-opacity', 1);
      });
      petals.select('.petalsCircle').transition().duration(transitionsTime).attr('cx', function (d, i) {
        return radius * d.polarCoordinates[0]; // Math.cos(d * 2 * Math.PI / 24 - Math.PI / 2);
      }).attr('cy', function (d, i) {
        return radius * d.polarCoordinates[1]; // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
      }).style('fill', d => d.color).on('interrupt', function (d) {
        d3.select(this).attr('cx', function (_, i) {
          return radius * d.polarCoordinates[0]; // Math.cos(d * 2 * Math.PI / 24 - Math.PI / 2);
        }).attr('cy', function (_, i) {
          return radius * d.polarCoordinates[1]; // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
        }).style('fill', _ => d.color);
      });
      const newPetals = petals.enter().append('g').attr('class', 'petal');
      const petalsArea = newPetals.append('path');
      petalsArea.attr('class', 'petalsArea').attr('d', petalLine).style('fill', d => d.color).style('fill-opacity', 0).on('mouseover', function (evt, d) {
        d3.select(this).transition().duration(transitionsTime).style('fill-opacity', instance.lookAndFeel.petalAreaOpacityActive);
        instance.showTooltip(d, radius);
        instance.showLegendtip(d, radius);
        /*const e = petalsArea.nodes();
        console.log("Nodes",e);
        console.log("T", this);
        console.log("S",d3.select(this));
        const ix = e.indexOf(this);
        */
        instance.showIndividualDataInset(d, radius);
      }).on('mouseout', function () {
        d3.select(this).transition().duration(transitionsTime).style('fill-opacity', instance.lookAndFeel.petalAreaOpacity);
        instance.hideTooltip();
        instance.hideLegendtip();
        instance.hideIndividualDataInset();
      }).transition().duration(transitionsTime).style('fill-opacity', this.lookAndFeel.petalAreaOpacity);
      newPetals.append('path').style('stroke-opacity', 0).transition().duration(transitionsTime).attr('class', 'petalsLine').attr('d', petalLine).style('stroke-width', this.lookAndFeel.petalLineWidth).style('stroke', d => d.color).style('fill', 'none').style('stroke-opacity', 1);
      // .style("filter" , "url(#glow)");
      // Append the circles
      newPetals.append('circle').attr('class', 'petalsCircle').attr('cx', function (d, i) {
        return radius * d.polarCoordinates[0]; // Math.cos(d * 2 * Math.PI / 24 - Math.PI / 2);
      }).attr('cy', function (d, i) {
        return radius * d.polarCoordinates[1]; // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
      }).attr('r', this.lookAndFeel.petalCircleRadius).style('fill', d => d.color).style('fill-opacity', this.lookAndFeel.petalCircleOpacity);
      petals.exit()
      // .transition().duration(transitionsTime / 2)
      // .style('opacity', 0.0)
      .remove();
      const petalsAll = petalsWrapper.selectAll('.petal')
      // .style("visibility", (n:PetalNode) => n.hidden ? "hidden":"visible");
      .style('display', n => n.hidden ? 'none' : null);
    });
    return context;
  }
  /*
  prepareIndividualPolarData(dataGroups: number[][], domain: number[],
                             removed: number[], palette: string[]): PolarPoint[][] {
    // append group index to the data so the colors can be generated for each data point (ix is for the parrent so it would
    // not be available
    const ind = dataGroups.map((g, ix) => g.map(a => {
      const v = new PolarPoint(this.polarUtil.calculatePolarCoordinate(a, domain), palette[ix]);
      return v;
    }));
    removed.forEach (ix => {
      if (ind[ix]) {
        ind[ix].forEach(p => p.hidden = true);
      }
    });
    return ind;
  }*/
  prepareIndividualDataInset(context) {
    if (!context.individualDotsInsetWrapper) {
      context.individualDotsInsetWrapper = context.mainPane.append('g').attr('class', 'dotsInset');
    }
    // the actual plotting happens in showIndividuals as it is data depended
    // we always hide it with new data first;
    this.hideIndividualDataInset();
    return context;
  }
  hideIndividualDataInset() {
    if (!this.graphicContext.individualDotsInsetWrapper) {
      return;
    }
    this.graphicContext.individualDotsInsetWrapper.style('opacity', 0.0);
  }
  showIndividualDataInset(p, radius) {
    if (!this.graphicContext.individualDotsInsetWrapper || !p.individuals || !this.showSelectedIndividuals) {
      return;
    }
    // console.log("P: "+p.polarCoordinates[0], p.polarCoordinates);
    const transitionsTime = this.lookAndFeel.baseTransitionsTime / 2;
    const d3 = this.d3;
    // console.log("Ix",ix);
    // console.log("D",this.individualPolarData[ix]);
    const individuals = p.individuals; // this.individualPolarData[ix];
    const dots = this.graphicContext.individualDotsInsetWrapper.selectAll('.dotsCircle').data(individuals);
    // existing dots
    dots.interrupt().style('opacity', 0.2).attr('cx', radius * p.polarCoordinates[0]).attr('cy', radius * p.polarCoordinates[1]).style('stroke', p.color).style('fill', p.color).transition().duration(transitionsTime).style('opacity', 1).attr('cx', d => radius * d.xy[0]).attr('cy', d => radius * d.xy[1]) // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
    ;
    // new dots
    dots.enter().append('circle').style('opacity', 0.2).attr('class', 'dotsCircle').attr('cx', radius * p.polarCoordinates[0]).attr('cy', radius * p.polarCoordinates[1]).attr('r', this.lookAndFeel.dotsCircleRadius).style('stroke-width', this.lookAndFeel.dotsCircleStrokeWidth).style('stroke', p.color).style('fill', p.color).style('fill-opacity', this.lookAndFeel.dotsCircleFillOpacity).transition().duration(transitionsTime).style('opacity', 1).attr('cx', d => radius * d.xy[0]).attr('cy', d => radius * d.xy[1]) // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
    ;
    // exit
    dots.exit().remove();
    this.graphicContext.individualDotsInsetWrapper.style('opacity', 1);
  }
  plotAllDataDots(petals, showDots, context) {
    const transitionsTime = this.lookAndFeel.baseTransitionsTime;
    const d3 = this.d3;
    const radius = context.radius;
    if (!context.dotsWrapper) {
      context.dotsWrapper = context.mainPane.append('g').attr('class', 'dotsWrapper');
    }
    const dotsWrapper = context.dotsWrapper;
    if (!showDots) {
      context.dotsWrapper.style('opacity', 0.0);
      return context;
    } else {
      context.dotsWrapper.style('opacity', 1);
    }
    const dotsData = petals.map(p => p.individuals);
    const instance = this;
    // so that angular change detection is not triggered for mouseover/our events or transitions
    this.ngZone.runOutsideAngular(() => {
      const dotsGroup = dotsWrapper.selectAll('.dotsGroup').data(dotsData);
      const dotsInExisting = dotsGroup.selectAll('.dotsCircle').data(d => d);
      dotsInExisting.transition().duration(transitionsTime).attr('cx', d => radius * d.xy[0]).attr('cy', d => radius * d.xy[1]) // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
      .style('stroke', d => d.color).style('fill', d => d.color);
      dotsInExisting.enter().append('circle').attr('class', 'dotsCircle').transition().duration(transitionsTime).attr('cx', d => radius * d.xy[0]).attr('cy', d => radius * d.xy[1]) // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
      .attr('r', this.lookAndFeel.dotsCircleRadius).style('stroke-width', this.lookAndFeel.dotsCircleStrokeWidth).style('stroke', d => d.color).style('fill', d => d.color).style('fill-opacity', this.lookAndFeel.dotsCircleFillOpacity);
      dotsInExisting.exit().transition().duration(transitionsTime / 2).style('opacity', 0.0).remove();
      // dotsGroup enter section
      const dotsInNewGroups = dotsGroup.enter().append('g').attr('class', 'dotsGroup').selectAll('.dotsCircle').data(d => d);
      dotsInNewGroups.enter().append('circle').attr('class', 'dotsCircle').transition().duration(transitionsTime).attr('cx', d => radius * d.xy[0]).attr('cy', d => radius * d.xy[1]) // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
      .attr('r', this.lookAndFeel.dotsCircleRadius).style('stroke-width', this.lookAndFeel.dotsCircleStrokeWidth).style('stroke', d => d.color).style('fill', d => d.color).style('fill-opacity', this.lookAndFeel.dotsCircleFillOpacity);
      // dotsGroup exit section
      dotsGroup.exit().transition().duration(transitionsTime / 2).style('opacity', 0.0).remove();
    });
    const dotsGroup = dotsWrapper // .selectAll(".dotsGroup")
    .selectAll('.dotsCircle')
    // .style("visibility", (n:PolarPoint) => n.hidden ? "hidden":"visible");
    .style('display', n => n.hidden ? 'none' : null);
    return context;
  }
  /*
  plotAllDataDots(dotsData: PolarPoint[][], showDots: boolean,
                  context: GraphicContext): GraphicContext {
    
    const transitionsTime = this.lookAndFeel.baseTransitionsTime;
    const d3 = this.d3;
    const radius = context.radius;
        if (!context.dotsWrapper) {
      context.dotsWrapper = context.mainPane.append<SVGGElement>('g').attr('class', 'dotsWrapper');
    }
    const dotsWrapper = context.dotsWrapper;
        if (!showDots) {
      context.dotsWrapper.style('opacity', 0.0);
      return context;
    } else {
      context.dotsWrapper.style('opacity', 1);
    }
        const instance = this;
    
    // so that angular change detection is not triggered for mouseover/our events or transitions
    this.ngZone.runOutsideAngular(() => {
          const dotsGroup = dotsWrapper.selectAll('.dotsGroup')
        .data(dotsData);
    
      const dotsInExisting = dotsGroup.selectAll('.dotsCircle')
        .data(d => d);
          dotsInExisting
        .transition().duration(transitionsTime)
        .attr('cx', d => radius * d.xy[0])
        .attr('cy', d => radius * d.xy[1]) // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
        .style('stroke', d => d.color)
        .style('fill', d => d.color)
      ;
          dotsInExisting.enter()
        .append('circle')
        .attr('class', 'dotsCircle')
        .transition().duration(transitionsTime)
        .attr('cx', d => radius * d.xy[0])
        .attr('cy', d => radius * d.xy[1]) // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
        .attr('r', this.lookAndFeel.dotsCircleRadius)
        .style('stroke-width', this.lookAndFeel.dotsCircleStrokeWidth)
        .style('stroke', d => d.color)
        .style('fill', d => d.color)
        .style('fill-opacity', this.lookAndFeel.dotsCircleFillOpacity);
    
      dotsInExisting.exit()
        .transition().duration(transitionsTime / 2)
        .style('opacity', 0.0)
        .remove();
          // dotsGroup enter section
      const dotsInNewGroups = dotsGroup.enter()
        .append<SVGGElement>('g')
        .attr('class', 'dotsGroup')
        .selectAll('.dotsCircle')
        .data(d => d);
    
      dotsInNewGroups.enter()
        .append('circle')
        .attr('class', 'dotsCircle')
        .transition().duration(transitionsTime)
        .attr('cx', d => radius * d.xy[0])
        .attr('cy', d => radius * d.xy[1]) // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
        .attr('r', this.lookAndFeel.dotsCircleRadius)
        .style('stroke-width', this.lookAndFeel.dotsCircleStrokeWidth)
        .style('stroke', d => d.color)
        .style('fill', d => d.color)
        .style('fill-opacity', this.lookAndFeel.dotsCircleFillOpacity);
          // dotsGroup exit section
      dotsGroup.exit()
        .transition().duration(transitionsTime / 2)
        .style('opacity', 0.0)
        .remove();
        });
        const dotsGroup = dotsWrapper// .selectAll(".dotsGroup")
      .selectAll('.dotsCircle')
      // .style("visibility", (n:PolarPoint) => n.hidden ? "hidden":"visible");
      .style('display', (n: PolarPoint) => n.hidden ? 'none' : null);
        return context;
  }
  */
  plotAxisGrid(context) {
    if (context.axisGrid) {
      return context; // this.axisGrid; //we only plot grid once
    }

    const radius = context.radius;
    const axisGrid = context.axisGrid = context.mainPane.append('g').attr('class', 'axisWrapper');
    axisGrid.selectAll('.levels').data([10, 2, 1]).enter().append('circle').attr('class', 'gridCircle').attr('r', function (d, i) {
      return radius / d;
    }).style('fill', this.lookAndFeel.gridColor).style('stroke', this.lookAndFeel.gridColor).style('fill-opacity', 0.15);
    // .style("filter" , "url(#glow)");
    const axis = axisGrid.selectAll('.axis').data([0, 3, 6, 9, 12, 15, 18, 21].map(v => this.polarUtil.normalizedPeakToPolar(v, 24)
    // polar coordinates with attached original value for the label
    )).enter().append('g').attr('class', 'axis');
    axis.append('line').attr('x1', 0).attr('y1', 0).attr('x2', function (d, i) {
      return radius * d[0]; // Math.cos(d * 2 * Math.PI / 24 - Math.PI / 2);
    }).attr('y2', function (d, i) {
      return radius * d[1]; // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
    }).attr('class', 'line').style('stroke', this.lookAndFeel.axisColor).style('stroke-dasharray', '5 5').style('stroke-width', this.lookAndFeel.axisWidth);
    axis.append('text').attr('class', 'legend')
    // .style("font-size", this.lookAndFeel.axisFontSize) //"10px")
    .attr('text-anchor', 'middle').attr('dy', '0.35em').attr('x', function (d, i) {
      return (radius + 15) * d[0]; // Math.cos(d * 2 * Math.PI / 24 - Math.PI / 2);
    }).attr('y', function (d, i) {
      return (radius + 15) * d[1]; // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
    }).text(function (d, i) {
      return d[2];
    });
    return context;
  }
  updateAxisLabels(domain, axisGrid) {
    const range = domain[1] - domain[0];
    const axis = axisGrid.selectAll('.axis');
    axis.select('text').text(function (d, i) {
      if (i === 0) {
        return SmartRounder.round(domain[1]) + ' / ' + SmartRounder.round(domain[0]);
      } else {
        return SmartRounder.round(domain[0] + d[2] / 24 * range);
      }
    });
  }
}
PolarPlotComponent.ɵfac = function PolarPlotComponent_Factory(t) {
  return new (t || PolarPlotComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef));
};
PolarPlotComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: PolarPlotComponent,
  selectors: [["bd2-ngx-polar-plot"]],
  inputs: {
    data: "data",
    errors: "errors",
    removed: "removed",
    scaleRadius: "scaleRadius",
    scaleWidth: "scaleWidth",
    showIndividuals: "showIndividuals",
    domain: "domain",
    palette: "palette",
    labels: "labels",
    labelsOn: "labelsOn",
    lookAndFeel: "lookAndFeel"
  },
  outputs: {
    colors: "colors"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]],
  decls: 1,
  vars: 0,
  consts: [[1, "polarplot"]],
  template: function PolarPlotComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div", 0);
    }
  },
  styles: ["[_nghost-%COMP%]     .axis .legend{font-size:15px}[_nghost-%COMP%]     .tooltip{font-size:15px}[_nghost-%COMP%]     .legendtip{font-size:18px}"],
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](PolarPlotComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Component,
    args: [{
      selector: 'bd2-ngx-polar-plot',
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectionStrategy.OnPush,
      template: `
    <div class="polarplot"></div>
  `,
      styles: [":host ::ng-deep .axis .legend{font-size:15px}:host ::ng-deep .tooltip{font-size:15px}:host ::ng-deep .legendtip{font-size:18px}\n"]
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef
    }];
  }, {
    data: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    errors: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    removed: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    scaleRadius: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    scaleWidth: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    showIndividuals: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    domain: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    palette: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    labels: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    labelsOn: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    lookAndFeel: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    colors: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output
    }]
  });
})();
class BD2NgxPolarplotModule {}
BD2NgxPolarplotModule.ɵfac = function BD2NgxPolarplotModule_Factory(t) {
  return new (t || BD2NgxPolarplotModule)();
};
BD2NgxPolarplotModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: BD2NgxPolarplotModule
});
BD2NgxPolarplotModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](BD2NgxPolarplotModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule,
    args: [{
      declarations: [PolarPlotComponent],
      imports: [
        // CommonModule
      ],
      exports: [PolarPlotComponent]
    }]
  }], null, null);
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](BD2NgxPolarplotModule, {
    declarations: [PolarPlotComponent],
    exports: [PolarPlotComponent]
  });
})();

/*
 * Public API Surface of bd2-ngx-polarplot
 */

/**
 * Generated bundle index. Do not edit.
 */



/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(11882)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map