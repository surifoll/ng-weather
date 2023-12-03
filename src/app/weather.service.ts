import { Injectable, Signal, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store, select } from "@ngrx/store";
import { HttpClient } from '@angular/common/http';
import { CurrentConditions } from './current-conditions/current-conditions.type';
import { ConditionsAndZip } from './conditions-and-zip.type';
import { Forecast } from './forecasts-list/forecast.type';
import { selectCurrentConditions } from './reducers/weather.reducer';
import { AppState } from './states/app.state';
import { map, tap } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable()
export class WeatherService {



  constructor(private http: HttpClient, private store: Store<AppState>) { }

  private getCacheKey(zipcode: string, type: string): string {
    return `${type}_${zipcode}`;
  }

  private getCacheData(zipcode: string, type: string): { data: any, timestamp: number } {
    const key = this.getCacheKey(zipcode, type);
    const cacheItem = localStorage.getItem(key);

    if (cacheItem) {
      const { data, timestamp } = JSON.parse(cacheItem);
      return { data, timestamp };
    }

    return null;
  }

  private setCacheData(zipcode: string, type: string, data: any): void {
    const key = this.getCacheKey(zipcode, type);
    const timestamp = Date.now();
    const cacheItem = { data, timestamp };
    localStorage.setItem(key, JSON.stringify(cacheItem));
  }
  
  private isCacheValid(timestamp: number): boolean {
    const cacheDuration = environment.CACHE_DURATION 
    const currentTime = Date.now();
    return currentTime - timestamp < cacheDuration;
  }

  addCurrentConditions(zipcode: string): Observable<CurrentConditions> {
    // Here we make a request to get the current conditions data from the API. Note the use of backticks and an expression to insert the zipcode
    const cacheData = this.getCacheData(zipcode, 'currentCondition');

    if (cacheData && this.isCacheValid(cacheData.timestamp)) {
      return of(cacheData.data);
    }
    return this.http.get<CurrentConditions>(`${environment.URL}/weather?zip=${zipcode},us&units=imperial&APPID=${environment.APPID}`).pipe(
      map(response => {
        return { ...response, icon: this.getWeatherIcon(response.id) }
      }),
      tap(data => this.setCacheData(zipcode, 'currentCondition', data))
    );

  }

  getForecast(zipcode: string): Observable<Forecast> {
    // Here we make a request to get the forecast data from the API. Note the use of backticks and an expression to insert the zipcode

    const cacheData = this.getCacheData(zipcode, 'forecast');

    if (cacheData && this.isCacheValid(cacheData.timestamp)) {
      return of(cacheData.data);
    }
    return this.http.get<Forecast>(`${environment.URL}/forecast/daily?zip=${zipcode},us&units=imperial&cnt=5&APPID=${environment.APPID}`).pipe(
      map(response => {
        const list = response.list.map((item) => {
          item.icon = this.getWeatherIcon(item.weather[0].id)
          return item;
        });
        return { ...response, list }
      }),
      tap(data => this.setCacheData(zipcode, 'forecast', data))
    );

  }

  getWeatherIcon(id): string {
    if (id >= 200 && id <= 232)
      return environment.ICON_URL + "art_storm.png";
    else if (id >= 501 && id <= 511)
      return environment.ICON_URL + "art_rain.png";
    else if (id === 500 || (id >= 520 && id <= 531))
      return environment.ICON_URL + "art_light_rain.png";
    else if (id >= 600 && id <= 622)
      return environment.ICON_URL + "art_snow.png";
    else if (id >= 801 && id <= 804)
      return environment.ICON_URL + "art_clouds.png";
    else if (id === 741 || id === 761)
      return environment.ICON_URL + "art_fog.png";
    else
      return environment.ICON_URL + "art_clear.png";
  }

}
