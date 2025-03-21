import { Component, computed, input } from '@angular/core';
import { Country } from '../types/country.type';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-info',
  imports: [DecimalPipe],
  template: `
    <section class="mx-10">
      <h1 class="text-3xl">{{ country().name }}</h1>
      <h1 class="text-xl font-thin">population {{ country().population | number }}</h1>

    </section>

    <section  class="stats shadow mx-5">
      <div class="stat place-items-center">
        <div class="stat-title">Population</div>
        <div class="stat-value">{{ country().population | number }}</div>
        <div class="stat-desc">From {{ currentYear() }}</div>
      </div>

      <div class="stat place-items-center">
        <div class="stat-title">Name</div>
        <div class="stat-value text-secondary">{{ country().name }}</div>
        <div class="stat-desc text-secondary">{{ country().region }}</div>
      </div>

      <div class="stat place-items-center">
        <div class="stat-title">Sub Region</div>
        <div class="stat-value">{{ country().subregion }}</div>
        <div class="stat-desc">{{ country().region }}</div>
      </div>

      <div class="stat place-items-center">
        <div class="stat-title">Flag</div>
        <div class="stat-value">{{ country().flag }}</div>
        <div class="stat-desc">{{ country().region }}</div>
      </div>
    </section>

    <section class="diff aspect-16/9" tabindex="0">
      <div class="diff-item-1" role="img">
        <img
        class="blur brightness-75"
          [alt]="country().name"
          [src]="country().flagSvg" />
      </div>
      <div class="diff-item-2" role="img" tabindex="0">
        <img

          [alt]="country().name"
          [src]="country().flagSvg" />
      </div>
      <div class="diff-resizer"></div>
    </section>
  `,
})
export class CountryInfoComponent {
  country = input.required<Country>();

  currentYear = computed(() => new Date().getFullYear());
}
