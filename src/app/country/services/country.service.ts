import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { RestCountry } from '../types/rest-countries.type';
import type { Country } from '../types/country.type';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheByCapital = new Map<string, Country[]>();
  private queryCacheByCountry = new Map<string, Country[]>();
  private queryCacheByRegion = new Map<string, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    if (this.queryCacheByCapital.has(query)) {
      return of(this.queryCacheByCapital.get(query) ?? []);
    }

    return this.http.get<RestCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map(CountryMapper.toCountries),
        tap((countries) => this.queryCacheByCapital.set(query, countries)),
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error('No countries were found with the given capital: ' + query));
        })
      );
  }

  searchByCountry(query: string): Observable<Country[]> {
    if (this.queryCacheByCountry.has(query)) {
      return of(this.queryCacheByCountry.get(query) ?? []);
    }

    return this.http.get<RestCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        map(CountryMapper.toCountries),
        tap((countries) => this.queryCacheByCountry.set(query, countries)),
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

  searchCountryByRegion(region: string): Observable<Country[]> {
    if (this.queryCacheByRegion.has(region)) {
      return of(this.queryCacheByRegion.get(region) ?? []);
    }

    return this.http.get<RestCountry[]>(`${API_URL}/region/${region}`)
      .pipe(
        map(CountryMapper.toCountries),
        tap((countries) => this.queryCacheByRegion.set(region, countries)),
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error('No countries were found with the given region: ' + region));
        })
      );
  }

}
