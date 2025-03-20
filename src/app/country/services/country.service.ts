import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { RestCountry } from '../types/rest-countries.type';
import type { Country } from '../types/country.type';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    return this.http.get<RestCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map(CountryMapper.toCountries),
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error('No countries were found with the given capital: ' + query));
        })
      );
  }
}
