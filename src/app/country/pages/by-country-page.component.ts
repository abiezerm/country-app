import { Component } from '@angular/core';
import { SearchInputComponent } from "../components/search-input.component";
import { CountryListComponent } from "../components/country-list.component";

@Component({
  selector: 'by-country',
  imports: [SearchInputComponent, CountryListComponent],
  template: `

    <country-search-input placeholder="Search country"  />

    <country-list [countries]="[]" />
  `,
})
export default class ByCountryPageComponent { }
