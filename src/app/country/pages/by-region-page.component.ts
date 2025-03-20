import { Component } from '@angular/core';
import { CountryListComponent } from "../components/country-list.component";

@Component({
  selector: 'by-region-page',
  imports: [CountryListComponent],
  template: `
    <country-list [countries]="[]" />
  `,
})
export default class ByRegionPageComponent { }
