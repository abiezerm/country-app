import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CountryService } from '../services/country.service';
import { NotFoundComponent } from '../components/not-found.component';
import { CountryInfoComponent } from "../components/country-info.component";

@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, CountryInfoComponent],
  template: `
    @if(countryResource.error()) {
      <app-not-found />
    }

    @if(countryResource.isLoading()) {
      <h1 class="text-3xl">Loading...</h1>
    }

    @if(countryResource.hasValue()){
      <country-info [country]="countryResource.value()" />
    }

  `,
})
export class CountryPageComponent {
  countryService = inject(CountryService);
  countryCode = inject(ActivatedRoute).snapshot.params['code'];

  countryResource = rxResource({
    request: () => ({code: this.countryCode}),
    loader: ({ request }) => {
      return this.countryService.searchCountryByCode(request.code);
    }
  })
}
