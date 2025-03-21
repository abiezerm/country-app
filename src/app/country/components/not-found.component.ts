import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-not-found',
  imports: [],
  template: `
    <section class="flex flex-col justify-center items-center mt-10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="75" height="75" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2">
            <path stroke-linejoin="round" d="M14 19c3.771 0 5.657 0 6.828-1.172S22 14.771 22 11s0-5.657-1.172-6.828S17.771 3 14 3h-4C6.229 3 4.343 3 3.172 4.172S2 7.229 2 11s0 5.657 1.172 6.828c.653.654 1.528.943 2.828 1.07"/>
            <path d="M14 19c-1.236 0-2.598.5-3.841 1.145c-1.998 1.037-2.997 1.556-3.489 1.225s-.399-1.355-.212-3.404L6.5 17.5m3.379-8.621L12 11m0 0l2.121 2.121M12 11l2.121-2.121M12 11l-2.121 2.121"/>
          </g>
        </svg>
        <h1>Country not found</h1>
        <a class="link link-primary cursor-pointer"  (click)="goBack()">Go back</a>
      </section>
  `,
})
export class NotFoundComponent {
  location = inject(Location);

  goBack() {
    this.location.back();
  }
}
