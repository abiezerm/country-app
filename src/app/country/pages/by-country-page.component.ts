import { Component, inject, signal } from '@angular/core';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

import { SearchInputComponent } from "../components/search-input.component";
import { CountryListComponent } from "../components/country-list.component";
import { CountryService } from '../services/country.service';

@Component({
  selector: 'by-country',
  imports: [SearchInputComponent, CountryListComponent],
  template: `

    <country-search-input placeholder="Search country" (value)="query.set($event)"  />

    <country-list
      [countries]="countryResource.value() ?? []"
      [errorMessage]="countryResource.error()"
      [isLoading]="countryResource.isLoading()"
      [isEmpty]="countryResource.value()?.length === 0"
    />
  `,
})
export default class ByCountryPageComponent {
  private countryService = inject(CountryService);
  query = signal<string>('');

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if(!request.query) return of([]);

      return this.countryService.searchByCountry(request.query);
    }
  });
}
