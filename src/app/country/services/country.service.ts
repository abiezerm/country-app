import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
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

  searchByCountry(query: string): Observable<Country[]> {
    return this.http.get<RestCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        map(CountryMapper.toCountries),
        (delay(3000)),
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error('No countries were found with the given name: ' + query));
        })
      );
  }

  searchCountryByCode(code: string): Observable<Country> {
    return this.http.get<RestCountry[]>(`${API_URL}/alpha/${code}`)
      .pipe(
        map(CountryMapper.toCountries),
        map((countries) => countries[0]),
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error('No country were found with the given code: ' + code));
        })
      );
  }

}
