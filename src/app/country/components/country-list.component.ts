import { Component, input } from '@angular/core';
import { RestCountry } from '../types/rest-countries.type';
import { Country } from '../types/country.type';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe, RouterLink],
  template: `
    <section class="mt-5">
      <table class="table table-md mt-2 w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Icon</th>
            <th>Flag</th>
            <th>Name</th>
            <th>Capital</th>
            <th>Population</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          @for (country of countries(); track country.cca2; let index = $index) {
            <tr>
              <td>{{ index + 1 }}</td>
              <td>{{ country.flag }}</td>
              <td> <img class="w-10" [src]="country.flagSvg" [alt]="country.name" /> </td>
              <td>{{ country.name }}</td>
              <td>{{ country.capital }}</td>
              <td> <span class="badge badge-secondary">{{ country.population | number }}</span> </td>
              <td><a class="link-primary cursor-pointer" [routerLink]="['/country/by', country.cca2]" href="#" >More information</a ></td>
            </tr>
          }

          @if(errorMessage()) {
              <tr>
                <td colspan="7">
                  <div class="text-center">{{ errorMessage() }}</div>
                </td>
              </tr>
          }

          @if(countries().length === 0 && !isLoading() && !errorMessage()) {
            <tr>
                <td colspan="7">
                  <div class="text-center">Not results found.</div>
                </td>
              </tr>
          }

          @if(isLoading()) {
            <tr>
              <td colspan="8">
                <div class="text-center">Loading...</div>
              </td>
            </tr>
          }

        </tbody>
      </table>
    </section>
  `,
})
export class CountryListComponent {
  countries = input.required<Country[]>();
  errorMessage = input<string | unknown>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);
}
