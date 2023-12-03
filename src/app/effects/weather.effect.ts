import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as WeatherActions from '../states/actions/weather.actions'; // Import your actions here
import { WeatherService } from 'app/weather.service';

@Injectable()
export class WeatherEffects {
  loadWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.loadWeather),
      mergeMap(action =>
        this.weatherService.addCurrentConditions(action.zipcode).pipe(
          map(weather => WeatherActions.loadWeatherSuccess({ conditionwithZip: {zip: action.zipcode, data: weather} })),
          catchError(error => of(WeatherActions.loadWeatherFailure({ error })))
        )
      )
    )
  );
  
  loadWeatherForcast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.loadForecast),
      mergeMap(action =>
        this.weatherService.getForecast(action.zipcode).pipe(
          map(forecast => WeatherActions.loadForecastSuccess({ forecast, zipcode: action.zipcode})),
          catchError(error => of(WeatherActions.loadForecastError({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private weatherService: WeatherService) {}
}
