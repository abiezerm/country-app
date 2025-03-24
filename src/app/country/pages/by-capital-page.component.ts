import { Component, inject, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { SearchInputComponent } from "../components/search-input.component";
import { CountryListComponent } from "../components/country-list.component";
import { CountryService } from '../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  template: `

    <country-search-input
      placeholder="Search capital"
      (value)="query.set($event)"
      [initialValue]="query()"
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
  private activatedRouted = inject(ActivatedRoute);
  private router = inject(Router);

  queryParam = this.activatedRouted.snapshot.queryParams['query'] ?? '';

  query = signal<string>(this.queryParam);

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if(!request.query) return of([]);

      this.router.navigate(['/country/by-capital'],{
        queryParams: { query: request.query }
      } )

      return this.countryService.searchByCapital(request.query);
    }

  })
}
