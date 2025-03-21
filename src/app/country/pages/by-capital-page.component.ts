import { Component, inject, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { firstValueFrom, of } from 'rxjs';
import { SearchInputComponent } from "../components/search-input.component";
import { CountryListComponent } from "../components/country-list.component";
import { CountryService } from '../services/country.service';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  template: `

    <country-search-input
      placeholder="Search capital"
      (value)="query.set($event)"
    />

    <country-list
      [countries]="countryResource.value() ?? []"
      [errorMessage]="countryResource.error()"
      [isLoading]="countryResource.isLoading()"
      [isEmpty]="countryResource.value()?.length === 0"
    />

  `,
})
export class ByCapitalPageComponent {
  private countryService = inject(CountryService);
  query = signal<string>('');

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if(!request.query) return of([]);

      return this.countryService.searchByCapital(request.query);
    }

  })

  // Normal Resource
  // countryResource = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async ({ request }) => {
  //     if(!request.query) return [];

  //     return firstValueFrom(this.countryService.searchByCapital(request.query));
  //   }
  // });

  // OLD Way
  // isLoading = signal(false);
  // hasError = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(query: string) {
  //   if(this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.hasError.set(null);

  //   this.countryService
  //     .searchByCapital(query)
  //     .subscribe({
  //       next: (countries ) => {
  //         this.isLoading.set(false);
  //         this.countries.set(countries);
  //       },
  //       error: (error) => {
  //         this.isLoading.set(false);
  //         this.countries.set([]);
  //         this.hasError.set(error);
  //       },
  //     });
  // }
}
