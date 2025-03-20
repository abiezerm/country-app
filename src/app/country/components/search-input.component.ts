import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  template: `
    <section class="flex flex-row gap-2 mt-2">
      <input
        type="text"
        class="input input-bordered mr-2 w-56"
        [placeholder]="placeholder()"
        autofocus
        #txtSearch
        (keyup.enter)="value.emit(txtSearch.value)"
      />

      <button class="btn btn-primary" (click)="value.emit(txtSearch.value)">Search</button>

    </section>
  `,
})
export class SearchInputComponent {
  placeholder = input<string>('Search')
  value = output<string>()
}
