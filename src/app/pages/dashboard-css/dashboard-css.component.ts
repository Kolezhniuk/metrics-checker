import { Component } from '@angular/core';

@Component({
  selector: 'ngx-css',
  templateUrl: './dashboard-css.component.html'
})
export class DashboardCssComponent {
  someObject = {
    "name":"John",
    "age":30,
    "cars": {
      "car1":"Ford",
      "car2":"BMW",
      "car3":"Fiat"
    }
  }
}
