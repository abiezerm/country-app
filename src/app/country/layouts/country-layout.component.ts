import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenuComponent } from "../components/top-menu.component";

@Component({
  selector: 'app-country-layout',
  imports: [RouterOutlet, TopMenuComponent],
  template: `
    <country-top-menu />

    <section class="px-4">
      <router-outlet></router-outlet>
    </section>
  `,
})
export class CountryLayoutComponent { }
