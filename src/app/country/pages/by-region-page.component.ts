import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from "../components/country-list.component";
import { Region } from '../types/region.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryService } from '../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam(queryParam: string): Region {
  queryParam = queryParam.toLowerCase();

  const validRegions: Record<string, Region> = {
    'africa': 'Africa',
    'americas': 'Americas',
    'antarctic': 'Antarctic',
    'asia': 'Asia',
    'europe': 'Europe',
    'oceania': 'Oceania',
  };

  return validRegions[queryParam.toLowerCase()] ?? 'Americas';
  //const validRegions ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'].includes(queryParam);
}

@Component({
  selector: 'by-region-page',
  imports: [CountryListComponent],
  template: `
    <h1 class="text-2xl">By Region</h1>
    <h3 class="text-lg">Select a region to see the countries:</h3>

    <section class="row mt-2">
      <div class="flex-col">
        @for (region of regions; track $index) {
          <button class="btn btn-outline mr-2 w-[100px]" (click)="selectedRegion.set(region)"
            [class.btn-primary]="selectedRegion() === region">
            {{ region }}
          </button>
        }
      </div>

    </section>


    <country-list
      [countries]="regionResource.value() ?? []"
      [errorMessage]="regionResource.error()"
      [isLoading]="regionResource.isLoading()"
      [isEmpty]="regionResource.value()?.length === 0"
    />
  `,
})
export default class ByRegionPageComponent {
  private countryService = inject(CountryService);
  private activatedRouted = inject(ActivatedRoute);
  private router = inject(Router);

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  queryParam = this.activatedRouted.snapshot.queryParams['region'] ?? '';

  selectedRegion = linkedSignal<Region>(() => validateQueryParam(this.queryParam));

  regionResource = rxResource({
    request: () => ({ query: this.selectedRegion() }),
    loader: ({ request }) => {
      if(!request.query) return of([]);

      this.router.navigate(['/country/by-region'],{
        queryParams: { region: request.query }
      } )

      return this.countryService.searchCountryByRegion(request.query);
    }

  })
}
