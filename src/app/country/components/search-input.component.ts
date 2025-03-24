import { Component, effect, input, output, signal } from '@angular/core';

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
        (keyup)="inputValue.set(txtSearch.value)"
      />

      <button class="btn btn-primary" (click)="value.emit(txtSearch.value)">Search</button>

    </section>
  `,
})
export class SearchInputComponent {
  placeholder = input<string>('Search')
  value = output<string>()

  inputValue = signal<string>('')

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue()

    const timeout = setTimeout(() => {
      this.value.emit(value)
    }
    , 500);

    onCleanup(() => clearTimeout(timeout));

  });
}
