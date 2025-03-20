import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'country-top-menu',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="p-4 w-full">
      <ul class="menu bg-base-200 sm:menu-horizontal rounded-box">
        <li>
          <a class="btn " routerLinkActive="btn-primary" routerLink="by-capital">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" d="M.5 15.5v-2.25S6 10.5 9.75 9.5V4.211c0-.79.23-1.565.707-2.194c.364-.48.828-1.052 1.293-1.517h.5c.465.465.93 1.037 1.293 1.517c.478.629.707 1.404.707 2.194V9.5c3.75 1 9.25 3.75 9.25 3.75v2.25s-5.5-1-9.25-1c0 0-.5 2.28-.5 6.5c0 0 1.25.75 2.25 1.75v.5S13.75 23 12 23s-4 .25-4 .25v-.5c1-1 2.25-1.75 2.25-1.75c0-4.22-.5-6.5-.5-6.5c-3.75 0-9.25 1-9.25 1Z" stroke-width="1"/></svg>
            By capital
          </a>
        </li>
        <li>
          <a class="btn " routerLinkActive="btn-primary" routerLink="by-country">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" d="M15.5 21.5v-17m0 17h-.333l-.358-.22A12 12 0 0 0 8.52 19.5H8.5m7 2h.177a12 12 0 0 0 6.173-1.71l.65-.39V2.5h-.25l-.357.22a12 12 0 0 1-6.29 1.78h-.353l-.483-.29A12 12 0 0 0 8.593 2.5H8.5m0 0h-.176A12 12 0 0 0 2.15 4.21l-.65.39v16.9h.25l.357-.22a12 12 0 0 1 6.29-1.78m.103-17v17m0 0h-.104m0 0H8.25" stroke-width="1"/></svg>
            By country
          </a>
        </li>
        <li>
          <a class="btn " routerLinkActive="btn-primary" routerLink="by-region">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" d="M0 20.5h24M9.019 10.193L1.417 7.188C3.185 4.713 4.422 1 4.422 1l1.238.53s.246 1.343 0 3.536l12.398 3.869a4.07 4.07 0 0 1 2.64 2.604c.373 1.116.843 2.473 1.225 3.427l-.353.353l-8.09-3.011c-3.931 2.304-7.467 3.011-7.467 3.011l-1.555-1.555s2.44-1.45 4.56-3.571Z" stroke-width="1"/></svg>
            By region
          </a>
        </li>
      </ul>
    </nav>

  `,
})
export class TopMenuComponent { }
