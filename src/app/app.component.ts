import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/components/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent],
  template: `
    <main class="m-auto flex-grow flex flex-col min-h-screen">
      <router-outlet />

      <div class="flex-1 flex-grow"></div>

      <app-footer />
    </main>
  `,
})
export class AppComponent {
  title = 'country-app';
}
